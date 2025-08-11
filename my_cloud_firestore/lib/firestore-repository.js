"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sort = exports.Order = exports.Direction = exports.FirestoreRepository = exports.ParentId = exports.Document = void 0;
const firestore_1 = require("firebase-admin/firestore");
class Document {
    constructor(id) {
        this.id = id;
    }
}
exports.Document = Document;
class ParentId {
}
exports.ParentId = ParentId;
class FirestoreRepository {
    constructor(firestore, fromJson) {
        this.firestore = firestore;
        this.fromJson = fromJson;
    }
    existsById(parentId, id, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            const documentReference = this.getCollectionReference(parentId).doc(id);
            let documentSnapshot;
            if ((extras === null || extras === void 0 ? void 0 : extras.transaction) != null) {
                documentSnapshot = yield extras.transaction.get(documentReference);
            }
            else {
                documentSnapshot = yield documentReference.get();
            }
            return documentSnapshot.exists;
        });
    }
    findById(parentId, id, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            const documentReference = this.getCollectionReference(parentId).doc(id);
            let documentSnapshot;
            if ((extras === null || extras === void 0 ? void 0 : extras.transaction) != null) {
                documentSnapshot = yield extras.transaction.get(documentReference);
            }
            else {
                documentSnapshot = yield documentReference.get();
            }
            return documentSnapshot.data();
        });
    }
    findByIds(parentId, ids, extras) {
        return Promise.all(ids.map((id) => this.findById(parentId, id, extras)));
    }
    findFirst(parentId, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            const documents = yield this.findBy(parentId, { filter: extras === null || extras === void 0 ? void 0 : extras.filter, sort: extras === null || extras === void 0 ? void 0 : extras.sort, limit: 1, transaction: extras === null || extras === void 0 ? void 0 : extras.transaction });
            return documents.length > 0 ? documents[0] : undefined;
        });
    }
    countBy(parentId, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.getCollectionReference(parentId);
            query = this.filter(query, extras === null || extras === void 0 ? void 0 : extras.filter);
            const aggregateQuery = query.count();
            let aggregateQuerySnapshot;
            if (extras === null || extras === void 0 ? void 0 : extras.transaction) {
                aggregateQuerySnapshot = yield extras.transaction.get(aggregateQuery);
            }
            else {
                aggregateQuerySnapshot = yield aggregateQuery.get();
            }
            return aggregateQuerySnapshot.data().count;
        });
    }
    sumBy(parentId, field, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.getCollectionReference(parentId);
            query = this.filter(query, extras === null || extras === void 0 ? void 0 : extras.filter);
            const aggregateQuery = query.aggregate({
                sum: firestore_1.AggregateField.sum(field),
            });
            let aggregateQuerySnapshot;
            if (extras === null || extras === void 0 ? void 0 : extras.transaction) {
                aggregateQuerySnapshot = yield extras.transaction.get(aggregateQuery);
            }
            else {
                aggregateQuerySnapshot = yield aggregateQuery.get();
            }
            return aggregateQuerySnapshot.data().sum;
        });
    }
    averageBy(parentId, field, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.getCollectionReference(parentId);
            query = this.filter(query, extras === null || extras === void 0 ? void 0 : extras.filter);
            const aggregateQuery = query.aggregate({
                average: firestore_1.AggregateField.average(field),
            });
            let aggregateQuerySnapshot;
            if (extras === null || extras === void 0 ? void 0 : extras.transaction) {
                aggregateQuerySnapshot = yield extras.transaction.get(aggregateQuery);
            }
            else {
                aggregateQuerySnapshot = yield aggregateQuery.get();
            }
            return aggregateQuerySnapshot.data().average;
        });
    }
    findBy(parentId, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.getCollectionReference(parentId);
            query = this.filter(query, extras === null || extras === void 0 ? void 0 : extras.filter);
            query = this.sort(query, extras === null || extras === void 0 ? void 0 : extras.sort);
            query = this.limit(query, extras === null || extras === void 0 ? void 0 : extras.limit);
            let querySnapshot;
            if (extras === null || extras === void 0 ? void 0 : extras.transaction) {
                querySnapshot = yield extras.transaction.get(query);
            }
            else {
                querySnapshot = yield query.get();
            }
            return querySnapshot.docs.map((queryDocumentSnapshot) => queryDocumentSnapshot.data());
        });
    }
    save(parentId, document, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            const collectionReference = this.getCollectionReference(parentId);
            let documentSnapshot;
            if (document.id == null) {
                documentSnapshot = collectionReference.doc();
                document.id = documentSnapshot.id;
            }
            else {
                documentSnapshot = collectionReference.doc(document.id);
            }
            if (extras === null || extras === void 0 ? void 0 : extras.transaction) {
                extras.transaction.set(documentSnapshot, document);
            }
            else if (extras === null || extras === void 0 ? void 0 : extras.batch) {
                extras.batch.set(documentSnapshot, document);
            }
            else {
                yield documentSnapshot.set(document);
            }
            return document;
        });
    }
    saveAll(parentId, documents, extras) {
        return Promise.all(documents.map((document) => this.save(parentId, document, extras)));
    }
    updateById(parentId, id, data, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            const documentReference = this.getCollectionReference(parentId).doc(id);
            if (extras === null || extras === void 0 ? void 0 : extras.transaction) {
                extras.transaction.update(documentReference, data);
            }
            else if (extras === null || extras === void 0 ? void 0 : extras.batch) {
                extras.batch.update(documentReference, data);
            }
            else {
                yield documentReference.update(data);
            }
        });
    }
    deleteById(parentId, id, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            const documentReference = this.getCollectionReference(parentId).doc(id);
            if ((extras === null || extras === void 0 ? void 0 : extras.transaction) != null) {
                extras.transaction.delete(documentReference);
            }
            else if ((extras === null || extras === void 0 ? void 0 : extras.batch) != null) {
                extras.batch.delete(documentReference);
            }
            else {
                yield documentReference.delete();
            }
        });
    }
    deleteByIds(parentId, ids, extras) {
        return Promise.all(ids.map((id) => this.deleteById(parentId, id, extras)));
    }
    delete(parentId, document, extras) {
        return this.deleteById(parentId, document.id, extras);
    }
    deleteAll(parentId, documents, extras) {
        return Promise.all(documents.map((document) => this.delete(parentId, document, extras)));
    }
    deleteBy(parentId, extras) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.getCollectionReference(parentId);
            query = this.filter(query, extras === null || extras === void 0 ? void 0 : extras.filter);
            const querySnapshot = yield query.get();
            yield Promise.all(querySnapshot.docs.map((queryDocumentSnapshot) => queryDocumentSnapshot.ref.delete()));
        });
    }
    getCollectionReference(parentId) {
        return parentId
            .getCollectionReference(this.firestore)
            .withConverter({
            fromFirestore: (snapshot) => this.fromJson(snapshot.data()),
            toFirestore: (document) => document.toJson(),
        });
    }
    filter(query, filter) {
        if (filter) {
            query = query.where(filter);
        }
        return query;
    }
    sort(query, sort) {
        if (sort) {
            for (const order of sort.orders) {
                query = query.orderBy(order.property, order.direction === Direction.asc ? "asc" : "desc");
            }
        }
        return query;
    }
    limit(query, limit) {
        if (limit) {
            query = query.limit(limit);
        }
        return query;
    }
}
exports.FirestoreRepository = FirestoreRepository;
var Direction;
(function (Direction) {
    Direction[Direction["asc"] = 0] = "asc";
    Direction[Direction["desc"] = 1] = "desc";
})(Direction || (exports.Direction = Direction = {}));
class Order {
    constructor(property, direction) {
        this.property = property;
        this.direction = direction;
    }
    static asc(property) {
        return new Order(property, Direction.asc);
    }
    static desc(property) {
        return new Order(property, Direction.desc);
    }
}
exports.Order = Order;
class Sort {
    constructor(orders) {
        this.orders = orders;
    }
    static by(orders) {
        return new Sort(orders);
    }
}
exports.Sort = Sort;
