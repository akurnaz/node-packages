export declare class NoSuchDocumentError extends Error {
    readonly key: string;
    readonly id?: string;
    constructor(key: string, id?: string);
}
