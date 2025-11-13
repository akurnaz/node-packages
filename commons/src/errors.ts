export class NoSuchDocumentError extends Error {
    readonly key: string;
    readonly id?: string;

    public constructor(key: string, id?: string) {
        super();
        this.key = key;
        this.id = id;
    }
}
