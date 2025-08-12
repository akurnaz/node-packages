"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const array_validator_1 = require("../../validation/array-validator");
const validator_1 = require("../../validation/validator");
describe("ArrayValidator.of", () => {
    it("should throw an error when the value is not an array", () => {
        const value = 10;
        const name = "arrayNumber";
        assert_1.strict.throws(() => {
            array_validator_1.ArrayValidator.of(value, name);
        });
    });
});
describe("ArrayValidator.notNull", () => {
    it("should throw an error when the value is null", () => {
        const value = null;
        const name = "nullArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notNull();
        });
    });
    it("should throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notNull();
        });
    });
    it("should not throw an error when the value is a valid array", () => {
        const value = [1, 2, 3];
        const name = "validArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.notNull();
        });
    });
});
describe("ArrayValidator.notEmpty", () => {
    it("should throw an error when the value is null", () => {
        const value = null;
        const name = "nullArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notEmpty();
        });
    });
    it("should throw an error when the value is empty", () => {
        const value = [];
        const name = "emptyArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notEmpty();
        });
    });
    it("should not throw an error when the value is a non-empty array", () => {
        const value = [1, 2, 3];
        const name = "nonEmptyArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.notEmpty();
        });
    });
});
describe("ArrayValidator.size", () => {
    it("should not throw an error when the value is null", () => {
        const value = null;
        const name = "nullArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.size(1, 3);
        });
    });
    it("should not throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "nullArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.size(1, 3);
        });
    });
    it("should throw an error when the value is an empty array", () => {
        const value = [];
        const name = "emptyArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.size(1, 3);
        });
    });
    it("should throw an error when the size is less than the minimum", () => {
        const value = [1];
        const name = "smallArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.size(2, 5);
        });
    });
    it("should throw an error when the size is greater than the maximum", () => {
        const value = [1, 2, 3, 4, 5, 6];
        const name = "largeArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.size(1, 5);
        });
    });
    it("should not throw an error when the size is within the specified boundaries", () => {
        const value = [1, 2, 3];
        const name = "validArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.size(1, 5);
        });
    });
});
describe("ArrayValidator.peek", () => {
    it("should not throw an error when all items pass the predicate", () => {
        const value = [1, 2, 3];
        const name = "validArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.peek(validator_1.requireNonNull);
        });
    });
    it("should throw an error when at least one item fails the predicate", () => {
        const value = [1, null, 3];
        const name = "arrayWithNull";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.peek(validator_1.requireNonNull);
        });
    });
    it("should throw an error when at least one item fails the predicate", () => {
        const value = [1, undefined, 3];
        const name = "arrayWithNull";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.peek(validator_1.requireNonNull);
        });
    });
    it("should not throw an error when the array is empty", () => {
        const value = [];
        const name = "emptyArray";
        const validator = array_validator_1.ArrayValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.peek(validator_1.requireNonNull);
        });
    });
});
