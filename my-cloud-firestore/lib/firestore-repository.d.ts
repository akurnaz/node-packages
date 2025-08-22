import { CollectionReference, DocumentData, Filter, Firestore, Transaction, UpdateData, WriteBatch } from "firebase-admin/firestore";
export declare abstract class Document {
    id?: string;
    constructor(id?: string);
    abstract toJson(): DocumentData;
}
export declare abstract class ParentId {
    abstract getCollectionReference(firestore: Firestore): CollectionReference<DocumentData>;
}
type FromJsonFunction<T extends Document> = (snapshot: DocumentData) => T;
export declare abstract class FirestoreRepository<T extends Document, P extends ParentId> {
    protected readonly firestore: Firestore;
    protected readonly fromJson: FromJsonFunction<T>;
    constructor(firestore: Firestore, fromJson: FromJsonFunction<T>);
    existsById(parentId: P, id: string, extras?: {
        transaction?: Transaction;
    }): Promise<boolean>;
    findById(parentId: P, id: string, extras?: {
        transaction?: Transaction;
    }): Promise<T | undefined>;
    findByIds(parentId: P, ids: string[], extras?: {
        transaction?: Transaction;
    }): Promise<(T | undefined)[]>;
    findFirst(parentId: P, extras?: {
        filter?: Filter;
        sort?: Sort;
        transaction?: Transaction;
    }): Promise<(T | undefined)>;
    countBy(parentId: P, extras?: {
        filter?: Filter;
        transaction?: Transaction;
    }): Promise<number>;
    sumBy(parentId: P, field: string, extras?: {
        filter?: Filter;
        transaction?: Transaction;
    }): Promise<number>;
    averageBy(parentId: P, field: string, extras?: {
        filter?: Filter;
        transaction?: Transaction;
    }): Promise<number | null>;
    findBy(parentId: P, extras?: {
        filter?: Filter;
        sort?: Sort;
        limit?: number;
        transaction?: Transaction;
    }): Promise<T[]>;
    save(parentId: P, document: T, extras?: {
        transaction?: Transaction;
        batch?: WriteBatch;
    }): Promise<T>;
    saveAll(parentId: P, documents: T[], extras?: {
        transaction?: Transaction;
        batch?: WriteBatch;
    }): Promise<T[]>;
    updateById(parentId: P, id: string, data: UpdateData<DocumentData>, extras?: {
        transaction?: Transaction;
        batch?: WriteBatch;
        ignoreIfNotExists?: boolean;
    }): Promise<void>;
    deleteById(parentId: P, id: string, extras?: {
        transaction?: Transaction;
        batch?: WriteBatch;
    }): Promise<void>;
    deleteByIds(parentId: P, ids: string[], extras?: {
        transaction?: Transaction;
        batch?: WriteBatch;
    }): Promise<void[]>;
    delete(parentId: P, document: T, extras?: {
        transaction?: Transaction;
        batch?: WriteBatch;
    }): Promise<void>;
    deleteAll(parentId: P, documents: T[], extras?: {
        transaction?: Transaction;
        batch?: WriteBatch;
    }): Promise<void[]>;
    deleteBy(parentId: P, extras?: {
        filter?: Filter;
    }): Promise<void>;
    protected getCollectionReference(parentId: P): CollectionReference<T>;
    private filter;
    private sort;
    private limit;
}
export declare enum Direction {
    asc = 0,
    desc = 1
}
export declare class Order {
    readonly property: string;
    readonly direction: Direction;
    private constructor();
    static asc(property: string): Order;
    static desc(property: string): Order;
}
export declare class Sort {
    readonly orders: Order[];
    private constructor();
    static by(orders: Order[]): Sort;
}
export {};
