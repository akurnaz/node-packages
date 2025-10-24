"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSuchDocumentError = void 0;
class NoSuchDocumentError extends Error {
    constructor(documentCode) {
        super(`No such document: ${documentCode}`);
        this.documentCode = documentCode;
    }
}
exports.NoSuchDocumentError = NoSuchDocumentError;
