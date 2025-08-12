"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayValidator = void 0;
const validator_1 = require("./validator");
class ArrayValidator extends validator_1.Validator {
    constructor(value, name) {
        super(value, name);
    }
    static of(value, name) {
        return new ArrayValidator(value, name).array();
    }
    array() {
        if (this.value != null && !Array.isArray(this.value)) {
            throw new validator_1.InvalidArgumentError(this.name + " must be an array");
        }
        return this;
    }
    /**
     * The annotated element must not be {@code null}.
     * @return {ArrayValidator} The current validator instance for chaining.
     */
    notNull() {
        if (this.value == null) {
            throw new validator_1.InvalidArgumentError(this.name + " cannot be null");
        }
        return this;
    }
    /**
     * The annotated element must not be {@code null} nor empty.
     * @return {ArrayValidator} The current validator instance for chaining.
     */
    notEmpty() {
        if (this.value == null || this.value.length === 0) {
            throw new validator_1.InvalidArgumentError(this.name + " cannot be null or empty");
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
    size(min, max) {
        min = min == null ? 0 : min;
        max = max == null ? Number.MAX_SAFE_INTEGER : max;
        if (this.value != null && (this.value.length < min || this.value.length > max)) {
            throw new validator_1.InvalidArgumentError(this.name + " size must be between " + min + " and " + max);
        }
        return this;
    }
    peek(action) {
        if (this.value != null) {
            for (const item of this.value) {
                action(item);
            }
        }
        return this;
    }
}
exports.ArrayValidator = ArrayValidator;
