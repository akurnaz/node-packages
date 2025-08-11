"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSuchDocumentError = exports.UnauthenticatedHttpsError = void 0;
class UnauthenticatedHttpsError extends Error {
}
exports.UnauthenticatedHttpsError = UnauthenticatedHttpsError;
class NoSuchDocumentError extends Error {
    constructor(documentCode) {
        super(`No such document: ${documentCode}`);
        this.documentCode = documentCode;
    }
}
exports.NoSuchDocumentError = NoSuchDocumentError;
