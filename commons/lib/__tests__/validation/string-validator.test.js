"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const string_validator_1 = require("../../validation/string-validator");
describe("StringValidator.of", () => {
    it("should throw an error when the value is not a string", () => {
        const value = 10;
        const name = "stringNumber";
        assert_1.strict.throws(() => {
            string_validator_1.StringValidator.of(value, name);
        });
    });
});
describe("StringValidator.notNull", () => {
    it("should throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = string_validator_1.StringValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notNull();
        });
    });
    it("should throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "nullNumber";
        const validator = string_validator_1.StringValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notNull();
        });
    });
    it("should not throw an error when the value is a valid string", () => {
        const value = "validString";
        const name = "validInteger";
        const validator = string_validator_1.StringValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.notNull();
        });
    });
});
describe("StringValidator.notBlank", () => {
    it("should throw an error when the value is null", () => {
        const value = null;
        const name = "nullString";
        const validator = string_validator_1.StringValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notBlank();
        });
    });
    it("should throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedString";
        const validator = string_validator_1.StringValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notBlank();
        });
    });
    it("should throw an error when the value is an empty string", () => {
        const value = "";
        const name = "emptyString";
        const validator = string_validator_1.StringValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notBlank();
        });
    });
    it("should throw an error when the value is a string with only whitespace", () => {
        const value = "   ";
        const name = "whitespaceString";
        const validator = string_validator_1.StringValidator.of(value, name);
        assert_1.strict.throws(() => {
            validator.notBlank();
        });
    });
    it("should not throw an error when the value is a valid non-blank string", () => {
        const value = "validString";
        const name = "validString";
        const validator = string_validator_1.StringValidator.of(value, name);
        assert_1.strict.doesNotThrow(() => {
            validator.notBlank();
        });
    });
});
