"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
describe('UnauthenticatedHttpsError', () => {
    it('should be instance of Error', () => {
        const err = new errors_1.UnauthenticatedHttpsError();
        expect(err).toBeInstanceOf(Error);
    });
});
describe('NoSuchDocumentError', () => {
    it('should set documentCode and message', () => {
        const err = new errors_1.NoSuchDocumentError('DOC123');
        expect(err.documentCode).toBe('DOC123');
        expect(err.message).toContain('DOC123');
    });
});
