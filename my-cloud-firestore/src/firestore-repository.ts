import {
    AggregateField,
    CollectionReference,
    DocumentData,
    Filter,
    Firestore,
    Query,
    Transaction,
    UpdateData,
    WriteBatch,
} from "firebase-admin/firestore";

export interface FirestoreSerializable {
    toJson(): DocumentData;
}

export abstract class Document implements FirestoreSerializable {
    id?: string;

    constructor(id?: string) {
        this.id = id;
    }

    abstract toJson(): DocumentData;
}

export abstract class ParentId {
    public abstract getCollectionReference(firestore: Firestore): CollectionReference<DocumentData>;
}

type FromJsonFunction<T extends Document> = (snapshot: DocumentData) => T;

export abstract class FirestoreRepository<T extends Document, P extends ParentId> {
    protected readonly firestore: Firestore;
    protected readonly fromJson: FromJsonFunction<T>;

    constructor(firestore: Firestore, fromJson: FromJsonFunction<T>) {
        this.firestore = firestore;
        this.fromJson = fromJson;
    }

    public async existsById(parentId: P, id: string, extras?: { transaction?: Transaction }): Promise<boolean> {
        const documentReference = this.getCollectionReference(parentId).doc(id);

        let documentSnapshot;
        if (extras?.transaction != null) {
            documentSnapshot = await extras.transaction.get(documentReference);
        } else {
            documentSnapshot = await documentReference.get();
        }

        return documentSnapshot.exists;
    }

    public async findById(parentId: P, id: string, extras?: { transaction?: Transaction }): Promise<T | undefined> {
        const documentReference = this.getCollectionReference(parentId).doc(id);

        let documentSnapshot;
        if (extras?.transaction != null) {
            documentSnapshot = await extras.transaction.get(documentReference);
        } else {
            documentSnapshot = await documentReference.get();
        }

        return documentSnapshot.data();
    }

    public findByIds(parentId: P, ids: string[], extras?: { transaction?: Transaction }): Promise<(T | undefined)[]> {
        return Promise.all(ids.map((id) => this.findById(parentId, id, extras)));
    }

    public async findFirst(
        parentId: P,
        extras?: { filter?: Filter, sort?: Sort, transaction?: Transaction }
    ): Promise<(T | undefined)> {
        const documents = await this.findBy(
            parentId,
            { filter: extras?.filter, sort: extras?.sort, limit: 1, transaction: extras?.transaction }
        );

        return documents.length > 0 ? documents[0] : undefined;
    }

    public async countBy(parentId: P, extras?: { filter?: Filter, transaction?: Transaction }): Promise<number> {
        let query: Query<T> = this.getCollectionReference(parentId);
        query = this.filter(query, extras?.filter);
        const aggregateQuery = query.count();

        let aggregateQuerySnapshot;
        if (extras?.transaction) {
            aggregateQuerySnapshot = await extras.transaction.get(aggregateQuery);
        } else {
            aggregateQuerySnapshot = await aggregateQuery.get();
        }

        return aggregateQuerySnapshot.data().count;
    }

    public async sumBy(
        parentId: P,
        field: string,
        extras?: { filter?: Filter, transaction?: Transaction }
    ): Promise<number> {
        let query: Query<T> = this.getCollectionReference(parentId);
        query = this.filter(query, extras?.filter);
        const aggregateQuery = query.aggregate({
            sum: AggregateField.sum(field),
        });

        let aggregateQuerySnapshot;
        if (extras?.transaction) {
            aggregateQuerySnapshot = await extras.transaction.get(aggregateQuery);
        } else {
            aggregateQuerySnapshot = await aggregateQuery.get();
        }

        return aggregateQuerySnapshot.data().sum;
    }

    public async averageBy(
        parentId: P,
        field: string,
        extras?: { filter?: Filter, transaction?: Transaction }
    ): Promise<number | null> {
        let query: Query<T> = this.getCollectionReference(parentId);
        query = this.filter(query, extras?.filter);
        const aggregateQuery = query.aggregate({
            average: AggregateField.average(field),
        });

        let aggregateQuerySnapshot;
        if (extras?.transaction) {
            aggregateQuerySnapshot = await extras.transaction.get(aggregateQuery);
        } else {
            aggregateQuerySnapshot = await aggregateQuery.get();
        }

        return aggregateQuerySnapshot.data().average;
    }

    public async findBy(
        parentId: P,
        extras?: { filter?: Filter, sort?: Sort, limit?: number, transaction?: Transaction }
    ): Promise<T[]> {
        let query: Query<T> = this.getCollectionReference(parentId);
        query = this.filter(query, extras?.filter);
        query = this.sort(query, extras?.sort);
        query = this.limit(query, extras?.limit);

        let querySnapshot;
        if (extras?.transaction) {
            querySnapshot = await extras.transaction.get(query);
        } else {
            querySnapshot = await query.get();
        }

        return querySnapshot.docs.map((queryDocumentSnapshot) => queryDocumentSnapshot.data());
    }

    public async save(
        parentId: P,
        document: T,
        extras?: { transaction?: Transaction, batch?: WriteBatch }
    ): Promise<T> {
        const collectionReference = this.getCollectionReference(parentId);

        let documentSnapshot;
        if (document.id == null) {
            documentSnapshot = collectionReference.doc();
            document.id = documentSnapshot.id;
        } else {
            documentSnapshot = collectionReference.doc(document.id);
        }

        if (extras?.transaction) {
            extras.transaction.set(documentSnapshot, document);
        } else if (extras?.batch) {
            extras.batch.set(documentSnapshot, document);
        } else {
            await documentSnapshot.set(document);
        }

        return document;
    }

    public saveAll(
        parentId: P,
        documents: T[],
        extras?: { transaction?: Transaction, batch?: WriteBatch }
    ): Promise<T[]> {
        return Promise.all(documents.map((document) => this.save(parentId, document, extras)));
    }

    public async updateById(
        parentId: P,
        id: string,
        data: UpdateData<DocumentData>,
        extras?: { transaction?: Transaction, batch?: WriteBatch, ignoreIfNotExists?: boolean }
    ): Promise<void> {
        if (extras?.ignoreIfNotExists) {
            if (extras.transaction != null) {
                throw Error('ignoreIfNotExists cannot be used with transaction');
            }

            const exists = await this.existsById(parentId, id);
            if (!exists) {
                return;
            }
        }

        const documentReference = this.getCollectionReference(parentId).doc(id);

        if (extras?.transaction) {
            extras.transaction.update(documentReference, data);
        } else if (extras?.batch) {
            extras.batch.update(documentReference, data);
        } else {
            await documentReference.update(data);
        }
    }

    public async deleteById(
        parentId: P,
        id: string,
        extras?: { transaction?: Transaction, batch?: WriteBatch }
    ): Promise<void> {
        const documentReference = this.getCollectionReference(parentId).doc(id);

        if (extras?.transaction != null) {
            extras.transaction.delete(documentReference);
        } else if (extras?.batch != null) {
            extras.batch.delete(documentReference);
        } else {
            await documentReference.delete();
        }
    }

    public deleteByIds(
        parentId: P,
        ids: string[],
        extras?: { transaction?: Transaction, batch?: WriteBatch }
    ): Promise<void[]> {
        return Promise.all(ids.map((id) => this.deleteById(parentId, id, extras)));
    }

    public delete(
        parentId: P,
        document: T,
        extras?: { transaction?: Transaction, batch?: WriteBatch }
    ): Promise<void> {
        return this.deleteById(parentId, document.id!, extras);
    }

    public deleteAll(
        parentId: P,
        documents: T[],
        extras?: { transaction?: Transaction, batch?: WriteBatch }
    ): Promise<void[]> {
        return Promise.all(documents.map((document) => this.delete(parentId, document, extras)));
    }

    public async deleteBy(parentId: P, extras?: { filter?: Filter }): Promise<void> {
        let query: Query<T> = this.getCollectionReference(parentId);
        query = this.filter(query, extras?.filter);

        const querySnapshot = await query.get();

        await Promise.all(
            querySnapshot.docs.map((queryDocumentSnapshot) => queryDocumentSnapshot.ref.delete()),
        );
    }

    protected getCollectionReference(parentId: P): CollectionReference<T> {
        return parentId
            .getCollectionReference(this.firestore)
            .withConverter<T>({
                fromFirestore: (snapshot) => this.fromJson(snapshot.data()),
                toFirestore: (document: T) => document.toJson(),
            });
    }

    private filter(query: Query<T>, filter?: Filter): Query<T> {
        if (filter) {
            query = query.where(filter);
        }

        return query;
    }

    private sort(query: Query<T>, sort?: Sort): Query<T> {
        if (sort) {
            for (const order of sort.orders) {
                query = query.orderBy(order.property, order.direction === Direction.asc ? "asc" : "desc");
            }
        }

        return query;
    }

    private limit(query: Query<T>, limit?: number): Query<T> {
        if (limit) {
            query = query.limit(limit);
        }

        return query;
    }
}

export enum Direction { asc, desc }

export class Order {
    readonly property: string;
    readonly direction: Direction;

    private constructor(property: string, direction: Direction) {
        this.property = property;
        this.direction = direction;
    }

    public static asc(property: string): Order {
        return new Order(property, Direction.asc);
    }

    public static desc(property: string): Order {
        return new Order(property, Direction.desc);
    }
}

export class Sort {
    readonly orders: Order[];

    private constructor(orders: Order[]) {
        this.orders = orders;
    }

    public static by(orders: Order[]) {
        return new Sort(orders);
    }
}
