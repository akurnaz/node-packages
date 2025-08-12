"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const number_validator_1 = require("../../validation/number-validator");
describe("NumberValidator.of", () => {
    it("should throw an error when the value is not a number", () => {
        const value = "notANumber";
        const name = "stringNumber";
        assert_1.strict.throws(() => {
            number_validator_1.NumberValidator.of(value, name);
        });
    });
});
describe("NumberValidator.notNull", () => {
    it("should throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notNull();
        });
    });
    it("should throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "nullNumber";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notNull();
        });
    });
    it("should not throw an error when the value is a valid integer", () => {
        const value = 10;
        const name = "validInteger";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.notNull();
        });
    });
});
describe("NumberValidator.integer", () => {
    it("should not throw an error when the value is null", () => {
        const value = null;
        const name = "nullInteger";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.integer();
        });
    });
    it("should not throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedInteger";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.integer();
        });
    });
    it("should throw an error when the value is a float", () => {
        const value = 10.5;
        const name = "floatValue";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.integer();
        });
    });
    it("should not throw an error when the value is an integer", () => {
        const value = 10;
        const name = "validInteger";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.integer();
        });
    });
});
describe("NumberValidator.min", () => {
    it("should not throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.min(5);
        });
    });
    it("should not throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedNumber";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.min(5);
        });
    });
    it("should throw an error when the value is less than the minimum", () => {
        const value = 3;
        const name = "lessThanMin";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.min(5);
        });
    });
    it("should not throw an error when the value is equal to the minimum", () => {
        const value = 5;
        const name = "equalToMin";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.min(5);
        });
    });
    it("should not throw an error when the value is greater than the minimum", () => {
        const value = 10;
        const name = "greaterThanMin";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.min(5);
        });
    });
});
describe("NumberValidator.max", () => {
    it("should not throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.max(5);
        });
    });
    it("should not throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedNumber";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.max(5);
        });
    });
    it("should throw an error when the value is greater than the maximum", () => {
        const value = 10;
        const name = "greaterThanMax";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.max(5);
        });
    });
    it("should not throw an error when the value is equal to the maximum", () => {
        const value = 5;
        const name = "equalToMax";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.max(5);
        });
    });
    it("should not throw an error when the value is less than the maximum", () => {
        const value = 3;
        const name = "lessThanMax";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.max(5);
        });
    });
});
describe("NumberValidator.negative", () => {
    it("should not throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.negative();
        });
    });
    it("should not throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedNumber";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.negative();
        });
    });
    it("should throw an error when the value is 0", () => {
        const value = 0;
        const name = "zeroInteger";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.negative();
        });
    });
    it("should throw an error when the value is 0.0", () => {
        const value = 0.0;
        const name = "zeroFloat";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.negative();
        });
    });
    it("should not throw an error when the value is negative integer", () => {
        const value = -5;
        const name = "negativeInteger";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.negative();
        });
    });
    it("should not throw an error when the value is a negative float", () => {
        const value = -10.5;
        const name = "negativeFloat";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.negative();
        });
    });
    it("should throw an error when the value is a positive integer", () => {
        const value = 10;
        const name = "positiveInteger";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.negative();
        });
    });
    it("should throw an error when the value is a positive float", () => {
        const value = 10.5;
        const name = "positiveFloat";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.negative();
        });
    });
});
describe("NumberValidator.positive", () => {
    it("should not throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.positive();
        });
    });
    it("should not throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedNumber";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.positive();
        });
    });
    it("should throw an error when the value is 0", () => {
        const value = 0;
        const name = "zeroInteger";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.positive();
        });
    });
    it("should throw an error when the value is 0.0", () => {
        const value = 0.0;
        const name = "zeroFloat";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.positive();
        });
    });
    it("should throw an error when the value is negative integer", () => {
        const value = -5;
        const name = "negativeInteger";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.positive();
        });
    });
    it("should throw an error when the value is a negative float", () => {
        const value = -10.5;
        const name = "negativeFloat";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.positive();
        });
    });
    it("should not throw an error when the value is a positive integer", () => {
        const value = 10;
        const name = "positiveInteger";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.positive();
        });
    });
    it("should not throw an error when the value is a positive float", () => {
        const value = 10.5;
        const name = "positiveFloat";
        const validator = number_validator_1.NumberValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.positive();
        });
    });
});
