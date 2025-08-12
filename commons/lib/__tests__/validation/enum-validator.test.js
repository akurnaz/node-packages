"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const enum_validator_1 = require("../../validation/enum-validator");
var TestEnum;
(function (TestEnum) {
    TestEnum["FIRST"] = "first";
    TestEnum["SECOND"] = "second";
})(TestEnum || (TestEnum = {}));
describe("EnumValidator.of", () => {
    it("should throw an error when the value is not a enum", () => {
        const value = 10;
        const name = "enumNumber";
        assert_1.strict.throws(() => {
            enum_validator_1.EnumValidator.of(value, name, TestEnum);
        });
    });
});
describe("EnumValidator.notNull", () => {
    it("should throw an error when the value is null", () => {
        const value = null;
        const name = "nullEnum";
        const validator = enum_validator_1.EnumValidator.of(value, name, TestEnum);
        assert_1.strict.throws(() => {
            validator.notNull();
        });
    });
    it("should throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedEnum";
        const validator = enum_validator_1.EnumValidator.of(value, name, TestEnum);
        assert_1.strict.throws(() => {
            validator.notNull();
        });
    });
    it("should not throw an error when the value is a valid enum", () => {
        const value = TestEnum.FIRST;
        const name = "validEnum";
        const validator = enum_validator_1.EnumValidator.of(value, name, TestEnum);
        assert_1.strict.doesNotThrow(() => {
            validator.notNull();
        });
    });
});
