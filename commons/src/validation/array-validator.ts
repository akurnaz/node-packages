import { InvalidArgumentError, Nullable, Validator } from "./validator";

export class ArrayValidator<T> extends Validator<Nullable<Array<T>>> {
    constructor(value: Nullable<Array<T>>, name: string) {
        super(value, name);
    }

    public static of<T>(value: Nullable<Array<T>>, name: string) {
        return new ArrayValidator(value, name).array();
    }

    private array(): ArrayValidator<T> {
        if (this.value != null && !Array.isArray(this.value)) {
            throw new InvalidArgumentError(this.name + " must be an array");
        }

        return this;
    }

    /**
     * The annotated element must not be {@code null}.
     * @return {ArrayValidator} The current validator instance for chaining.
     */
    public notNull(): ArrayValidator<T> {
        if (this.value == null) {
            throw new InvalidArgumentError(this.name + " cannot be null");
        }

        return this;
    }

    /**
     * The annotated element must not be {@code null} nor empty.
     * @return {ArrayValidator} The current validator instance for chaining.
     */
    public notEmpty(): ArrayValidator<T> {
        if (this.value == null || this.value.length === 0) {
            throw new InvalidArgumentError(this.name + " cannot be null or empty");
        }

        return this;
    }

    /**
     * The annotated element size must be between the specified boundaries (included).
     * {@code null} elements are considered valid.
     * @param {number} min The minimum allowed size.
     * @param {number} max The maximum allowed size.
     * @return {ArrayValidator} The current validator instance for chaining.
     */
    public size(min: number, max: number): ArrayValidator<T> {
        min = min == null ? 0 : min;
        max = max == null ? Number.MAX_SAFE_INTEGER : max;

        if (this.value != null && (this.value.length < min || this.value.length > max)) {
            throw new InvalidArgumentError(this.name + " size must be between " + min + " and " + max);
        }

        return this;
    }

    public peek(action: (item: T) => void): ArrayValidator<T> {
        if (this.value != null) {
            for (const item of this.value) {
                action(item);
            }
        }

        return this;
    }
}
