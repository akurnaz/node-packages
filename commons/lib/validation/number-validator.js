"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberValidator = void 0;
const validator_1 = require("./validator");
class NumberValidator extends validator_1.Validator {
    constructor(value, name) {
        super(value, name);
    }
    static of(value, name) {
        return new NumberValidator(value, name).number();
    }
    number() {
        if (this.value != null && typeof this.value !== "number") {
            throw new validator_1.InvalidArgumentError(this.name + " must be a number");
        }
        return this;
    }
    /**
     * The annotated element must not be {@code null}.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    notNull() {
        if (this.value == null) {
            throw new validator_1.InvalidArgumentError(this.name + " cannot be null");
        }
        return this;
    }
    /**
     * The annotated element must be a valid integer.
     * {@code null} elements are considered valid.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    integer() {
        if (this.value != null && !Number.isInteger(this.value)) {
            throw new validator_1.InvalidArgumentError(this.name + " must be an integer");
        }
        return this;
    }
    /**
     * The annotated element must be a number whose value must be higher or equal to the specified minimum.
     * {@code null} elements are considered valid.
     * @param {number} minValue The minimum value allowed.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    min(minValue) {
        if (this.value != null && this.value < minValue) {
            throw new validator_1.InvalidArgumentError(`${this.name} must be greater than or equal to ${minValue}. ` +
                `Received: ${this.value}`);
        }
        return this;
    }
    /**
     * The annotated element must be a number whose value must be lower or equal to the specified maximum.
     * {@code null} elements are considered valid.
     * @param {number} maxValue The maximum value allowed.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    max(maxValue) {
        if (this.value != null && this.value > maxValue) {
            throw new validator_1.InvalidArgumentError(`${this.name} must be less than or equal to ${maxValue}. ` +
                `Received: ${this.value}`);
        }
        return this;
    }
    /**
     * The annotated element must be a strictly negative number (i.e. 0 is considered as an invalid value).
     * {@code null} elements are considered valid.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    negative() {
        if (this.value != null && this.value >= 0) {
            throw new validator_1.InvalidArgumentError(`${this.name} must be negative. Received: ${this.value}`);
        }
        return this;
    }
    /**
     * The annotated element must be a strictly positive number (i.e., 0 is considered as an
     * invalid value).
     * {@code null} elements are considered valid.
     * @return {NumberValidator} The current validator instance for chaining.
     */
    positive() {
        if (this.value != null && this.value <= 0) {
            throw new validator_1.InvalidArgumentError(this.name + " must be positive");
        }
        return this;
    }
}
exports.NumberValidator = NumberValidator;
