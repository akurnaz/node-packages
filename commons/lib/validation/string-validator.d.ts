import { Nullable, Validator } from "./validator";
export declare class StringValidator extends Validator<Nullable<string>> {
    constructor(value: Nullable<string>, name: string);
    static of(value: Nullable<string>, name: string): StringValidator;
    private string;
    /**
     * The annotated element must not be {@code null}.
     * @return {StringValidator} The current validator instance for chaining.
     */
    notNull(): StringValidator;
    /**
     * The annotated element must not be {@code null} and must contain at least one
     * non-whitespace character.
     * @return {StringValidator} The current validator instance for chaining.
     */
    notBlank(): StringValidator;
    /**
     * The annotated element size must be between the specified boundaries (included).
     * {@code null} elements are considered valid.
     * @param {number} min The minimum allowed length.
     * @param {number} max The maximum allowed length.
     * @return {StringValidator} The current validator instance for chaining.
     */
    size(min: Nullable<number>, max: Nullable<number>): StringValidator;
}
