import { InvalidArgumentError, Nullable, Validator } from "./validator";

export class StringValidator extends Validator<Nullable<string>> {
    constructor(value: Nullable<string>, name: string) {
        super(value, name);
    }

    public static of(value: Nullable<string>, name: string) {
        return new StringValidator(value, name).string();
    }

    private string(): StringValidator {
        if (this.value != null && typeof this.value !== "string") {
            throw new InvalidArgumentError(this.name + " must be a string");
        }

        return this;
    }

    /**
     * The annotated element must not be {@code null}.
     * @return {StringValidator} The current validator instance for chaining.
     */
    public notNull(): StringValidator {
        if (this.value == null) {
            throw new InvalidArgumentError(this.name + " cannot be null");
        }

        return this;
    }

    /**
     * The annotated element must not be {@code null} and must contain at least one
     * non-whitespace character.
     * @return {StringValidator} The current validator instance for chaining.
     */
    public notBlank(): StringValidator {
        if (this.value == null || this.value.trim() === "") {
            throw new InvalidArgumentError(this.name + " cannot be blank");
        }

        return this;
    }

    /**
     * The annotated element size must be between the specified boundaries (included).
     * {@code null} elements are considered valid.
     * @param {number} min The minimum allowed length.
     * @param {number} max The maximum allowed length.
     * @return {StringValidator} The current validator instance for chaining.
     */
    public size(min: Nullable<number>, max: Nullable<number>): StringValidator {
        min = min == null ? 0 : min;
        max = max == null ? Number.MAX_SAFE_INTEGER : max;

        if (this.value != null && (this.value.length < min || this.value.length > max)) {
            throw new InvalidArgumentError(this.name + " must be between " + min + " and " + max + " characters");
        }

        return this;
    }
}
