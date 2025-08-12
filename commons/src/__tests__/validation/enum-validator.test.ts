import { strict as assert } from "assert";
import { EnumValidator } from "../../validation/enum-validator";

enum TestEnum {
    FIRST = "first",
    SECOND = "second"
}

describe("EnumValidator.of", () => {
    it("should throw an error when the value is not a enum", () => {
        const value = 10 as unknown as TestEnum;
        const name = "enumNumber";

        assert.throws(() => {
            EnumValidator.of(value, name, TestEnum);
        });
    });
});

describe("EnumValidator.notNull", () => {
    it("should throw an error when the value is null", () => {
        const value = null;
        const name = "nullEnum";
        const validator = EnumValidator.of(value, name, TestEnum);

        assert.throws(() => {
            validator.notNull();
        });
    });

    it("should throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedEnum";
        const validator = EnumValidator.of(value, name, TestEnum);

        assert.throws(() => {
            validator.notNull();
        });
    });

    it("should not throw an error when the value is a valid enum", () => {
        const value = TestEnum.FIRST;
        const name = "validEnum";
        const validator = EnumValidator.of(value, name, TestEnum);

        assert.doesNotThrow(() => {
            validator.notNull();
        });
    });
});
