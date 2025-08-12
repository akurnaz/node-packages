import { Nullable, Validator } from "./validator";
export declare class NumberValidator extends Validator<Nullable<number>> {
    constructor(value: Nullable<number>, name: string);
    static of(value: Nullable<number>, name: string): NumberValidator;
    private number;
    /**
     * The annotated element must not be {@code null}.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    notNull(): NumberValidator;
    /**
     * The annotated element must be a valid integer.
     * {@code null} elements are considered valid.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    integer(): NumberValidator;
    /**
     * The annotated element must be a number whose value must be higher or equal to the specified minimum.
     * {@code null} elements are considered valid.
     * @param {number} minValue The minimum value allowed.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    min(minValue: number): NumberValidator;
    /**
     * The annotated element must be a number whose value must be lower or equal to the specified maximum.
     * {@code null} elements are considered valid.
     * @param {number} maxValue The maximum value allowed.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    max(maxValue: number): NumberValidator;
    /**
     * The annotated element must be a strictly negative number (i.e. 0 is considered as an invalid value).
     * {@code null} elements are considered valid.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    negative(): NumberValidator;
    /**
     * The annotated element must be a strictly positive number (i.e., 0 is considered as an
     * invalid value).
     * {@code null} elements are considered valid.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    positive(): NumberValidator;
}
