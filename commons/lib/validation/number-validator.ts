import { InvalidArgumentError, Nullable, Validator } from "./validator";

export class NumberValidator extends Validator<Nullable<number>> {
    constructor(value: Nullable<number>, name: string) {
        super(value, name);
    }

    public static of(value: Nullable<number>, name: string) {
        return new NumberValidator(value, name).number();
    }

    private number(): NumberValidator {
        if (this.value != null && typeof this.value !== "number") {
            throw new InvalidArgumentError(this.name + " must be a number");
        }

        return this;
    }

    /**
     * The annotated element must not be {@code null}.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    public notNull(): NumberValidator {
        if (this.value == null) {
            throw new InvalidArgumentError(this.name + " cannot be null");
        }

        return this;
    }

    /**
     * The annotated element must be a valid integer.
     * {@code null} elements are considered valid.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    public integer(): NumberValidator {
        if (this.value != null && !Number.isInteger(this.value)) {
            throw new InvalidArgumentError(this.name + " must be an integer");
        }

        return this;
    }

    /**
     * The annotated element must be a number whose value must be higher or equal to the specified minimum.
     * {@code null} elements are considered valid.
     * @param {number} minValue The minimum value allowed.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    public min(minValue: number): NumberValidator {
        if (this.value != null && this.value < minValue) {
            throw new InvalidArgumentError(
                `${this.name} must be greater than or equal to ${minValue}. ` +
                `Received: ${this.value}`
            );
        }

        return this;
    }

    /**
     * The annotated element must be a number whose value must be lower or equal to the specified maximum.
     * {@code null} elements are considered valid.
     * @param {number} maxValue The maximum value allowed.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    public max(maxValue: number): NumberValidator {
        if (this.value != null && this.value > maxValue) {
            throw new InvalidArgumentError(
                `${this.name} must be less than or equal to ${maxValue}. ` +
                `Received: ${this.value}`
            );
        }

        return this;
    }

    /**
     * The annotated element must be a strictly negative number (i.e. 0 is considered as an invalid value).
     * {@code null} elements are considered valid.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    public negative(): NumberValidator {
        if (this.value != null && this.value >= 0) {
            throw new InvalidArgumentError(`${this.name} must be negative. Received: ${this.value}`);
        }

        return this;
    }

    /**
     * The annotated element must be a strictly positive number (i.e., 0 is considered as an
     * invalid value).
     * {@code null} elements are considered valid.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    public positive(): NumberValidator {
        if (this.value != null && this.value <= 0) {
            throw new InvalidArgumentError(this.name + " must be positive");
        }

        return this;
    }
}
