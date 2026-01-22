export interface ScrollPosition {
    readonly isInitial: boolean;
}
export declare class TokenScrollPosition implements ScrollPosition {
    readonly token?: string | undefined;
    private static readonly empty;
    private constructor();
    static initial(): TokenScrollPosition;
    static of(token?: string): TokenScrollPosition;
    get isInitial(): boolean;
}
export declare class KeysetScrollPosition implements ScrollPosition {
    readonly keys?: Readonly<Record<string, unknown>> | undefined;
    private static readonly empty;
    private constructor();
    static initial(): KeysetScrollPosition;
    static of(keys?: Record<string, unknown>): KeysetScrollPosition;
    get isInitial(): boolean;
}
