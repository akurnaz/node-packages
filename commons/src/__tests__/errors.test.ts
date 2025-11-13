import { NoSuchDocumentError } from '../errors';

describe('NoSuchDocumentError', () => {
  it('should set documentCode and message', () => {
    const err = new NoSuchDocumentError('DOC123');
    expect(err.code).toBe('DOC123');
    expect(err.message).toContain('DOC123');
  });
});
