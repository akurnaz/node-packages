"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringValidator = void 0;
const validator_1 = require("./validator");
class StringValidator extends validator_1.Validator {
    constructor(value, name) {
        super(value, name);
    }
    static of(value, name) {
        return new StringValidator(value, name).string();
    }
    string() {
        if (this.value != null && typeof this.value !== "string") {
            throw new validator_1.InvalidArgumentError(this.name + " must be a string");
        }
        return this;
    }
    /**
     * The annotated element must not be {@code null}.
     * @return {StringValidator} The current validator instance for chaining.
     */
    notNull() {
        if (this.value == null) {
            throw new validator_1.InvalidArgumentError(this.name + " cannot be null");
        }
        return this;
    }
    /**
     * The annotated element must not be {@code null} and must contain at least one
     * non-whitespace character.
     * @return {StringValidator} The current validator instance for chaining.
     */
    notBlank() {
        if (this.value == null || this.value.trim() === "") {
            throw new validator_1.InvalidArgumentError(this.name + " cannot be blank");
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
    size(min, max) {
        min = min == null ? 0 : min;
        max = max == null ? Number.MAX_SAFE_INTEGER : max;
        if (this.value != null && (this.value.length < min || this.value.length > max)) {
            throw new validator_1.InvalidArgumentError(this.name + " must be between " + min + " and " + max + " characters");
        }
        return this;
    }
}
exports.StringValidator = StringValidator;
