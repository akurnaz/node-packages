export type Nullable<T> = T | null | undefined;
export declare class InvalidArgumentError extends Error {
    constructor(message: string);
}
export declare abstract class Validator<T> {
    protected readonly value: T;
    protected readonly name: string;
    protected constructor(value: T, name: string);
    getValue<R>(): R;
}
export declare function requireNonNull<T>(value: Nullable<T>, message?: string): T;
