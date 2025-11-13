export class NoSuchDocumentError extends Error {
    readonly code: string;
    readonly id?: string;

    public constructor(code: string, id?: string) {
        super();
        this.code = code;
        this.id = id;
    }
}
