export class NoSuchDocumentError extends Error {
    readonly documentCode: string;

    public constructor(documentCode: string) {
        super(`No such document: ${documentCode}`);
        this.documentCode = documentCode;
    }
}
