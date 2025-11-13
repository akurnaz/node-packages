export declare class NoSuchDocumentError extends Error {
    readonly code: string;
    readonly id?: string;
    constructor(code: string, id?: string);
}
