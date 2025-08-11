export declare class UnauthenticatedHttpsError extends Error {
}
export declare class NoSuchDocumentError extends Error {
    readonly documentCode: string;
    constructor(documentCode: string);
}
