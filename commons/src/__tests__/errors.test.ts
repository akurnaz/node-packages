import { UnauthenticatedHttpsError, NoSuchDocumentError } from '../errors';

describe('UnauthenticatedHttpsError', () => {
  it('should be instance of Error', () => {
    const err = new UnauthenticatedHttpsError();
    expect(err).toBeInstanceOf(Error);
  });
});

describe('NoSuchDocumentError', () => {
  it('should set documentCode and message', () => {
    const err = new NoSuchDocumentError('DOC123');
    expect(err.documentCode).toBe('DOC123');
    expect(err.message).toContain('DOC123');
  });
});
