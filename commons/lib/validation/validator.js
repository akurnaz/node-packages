"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = exports.InvalidArgumentError = void 0;
exports.requireNonNull = requireNonNull;
class InvalidArgumentError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidArgumentError";
    }
}
exports.InvalidArgumentError = InvalidArgumentError;
class Validator {
    constructor(value, name) {
        this.value = value;
        this.name = name;
    }
    getValue() {
        return this.value;
    }
}
exports.Validator = Validator;
function requireNonNull(value, message) {
    if (value == null) {
        throw new InvalidArgumentError(message !== null && message !== void 0 ? message : "Value must not be null or undefined");
    }
    return value;
}
