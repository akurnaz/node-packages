export interface ScrollPosition {
    readonly isInitial: boolean;
}

export class TokenScrollPosition implements ScrollPosition {
    private static readonly empty = new TokenScrollPosition(undefined);

    private constructor(public readonly token?: string) {}

    static initial(): TokenScrollPosition {
        return TokenScrollPosition.empty;
    }

    static of(token?: string): TokenScrollPosition {
        return token == null ? TokenScrollPosition.empty : new TokenScrollPosition(token);
    }

    get isInitial(): boolean {
        return this.token == null;
    }
}

export class KeysetScrollPosition implements ScrollPosition {
    private static readonly empty = new KeysetScrollPosition(undefined);

    private constructor(public readonly keys?: Readonly<Record<string, unknown>>) {}

    static initial(): KeysetScrollPosition {
        return KeysetScrollPosition.empty;
    }

    static of(keys?: Record<string, unknown>): KeysetScrollPosition {
        return keys == null ? KeysetScrollPosition.empty : new KeysetScrollPosition(Object.freeze({ ...keys }));
    }

    get isInitial(): boolean {
        return this.keys == null;
    }
}
