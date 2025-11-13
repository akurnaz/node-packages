"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSuchDocumentError = void 0;
class NoSuchDocumentError extends Error {
    constructor(code, id) {
        super();
        this.code = code;
        this.id = id;
    }
}
exports.NoSuchDocumentError = NoSuchDocumentError;
