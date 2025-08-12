import { Nullable, Validator } from "./validator";
export declare class ArrayValidator<T> extends Validator<Nullable<Array<T>>> {
    constructor(value: Nullable<Array<T>>, name: string);
    static of<T>(value: Nullable<Array<T>>, name: string): ArrayValidator<T>;
    private array;
    /**
     * The annotated element must not be {@code null}.
     * @return {ArrayValidator} The current validator instance for chaining.
     */
    notNull(): ArrayValidator<T>;
    /**
     * The annotated element must not be {@code null} nor empty.
     * @return {ArrayValidator} The current validator instance for chaining.
     */
    notEmpty(): ArrayValidator<T>;
    /**
     * The annotated element size must be between the specified boundaries (included).
     * {@code null} elements are considered valid.
     * @param {number} min The minimum allowed size.
     * @param {number} max The maximum allowed size.
     * @return {ArrayValidator} The current validator instance for chaining.
     */
    size(min: number, max: number): ArrayValidator<T>;
    peek(action: (item: T) => void): ArrayValidator<T>;
}
