"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumValidator = void 0;
const validator_1 = require("./validator");
class EnumValidator extends validator_1.Validator {
    constructor(value, name, enumType) {
        super(value, name);
        this.enumType = enumType;
    }
    static of(value, name, enumType) {
        return new EnumValidator(value, name, enumType).enum();
    }
    enum() {
        if (this.value != null && !Object.values(this.enumType).includes(this.value)) {
            throw new validator_1.InvalidArgumentError(this.name + " must be a valid enum value");
        }
        return this;
    }
    notNull() {
        if (this.value == null) {
            throw new validator_1.InvalidArgumentError(this.name + " cannot be null");
        }
        return this;
    }
}
exports.EnumValidator = EnumValidator;
