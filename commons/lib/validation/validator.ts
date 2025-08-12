export type Nullable<T> = T | null | undefined;

export class InvalidArgumentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidArgumentError";
    }
}

export abstract class Validator<T> {
    protected readonly value: T;
    protected readonly name: string;

    protected constructor(value: T, name: string) {
        this.value = value;
        this.name = name;
    }

    public getValue<R>(): R {
        return this.value as unknown as R;
    }
}

export function requireNonNull<T>(value: Nullable<T>, message?: string): T {
    if (value == null) {
        throw new InvalidArgumentError(message ?? "Value must not be null or undefined");
    }

    return value;
}
