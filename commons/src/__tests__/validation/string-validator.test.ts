import { strict as assert } from "assert";
import { StringValidator } from "../../validation/string-validator";

describe("StringValidator.of", () => {
    it("should throw an error when the value is not a string", () => {
        const value = 10 as unknown as string;
        const name = "stringNumber";

        assert.throws(() => {
            StringValidator.of(value, name);
        });
    });
});

describe("StringValidator.notNull", () => {
    it("should throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = StringValidator.of(value, name);

        assert.throws(() => {
            validator.notNull();
        });
    });

    it("should throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "nullNumber";
        const validator = StringValidator.of(value, name);

        assert.throws(() => {
            validator.notNull();
        });
    });

    it("should not throw an error when the value is a valid string", () => {
        const value = "validString";
        const name = "validInteger";
        const validator = StringValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.notNull();
        });
    });
});

describe("StringValidator.notBlank", () => {
    it("should throw an error when the value is null", () => {
        const value = null;
        const name = "nullString";
        const validator = StringValidator.of(value, name);

        assert.throws(() => {
            validator.notBlank();
        });
    });

    it("should throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedString";
        const validator = StringValidator.of(value, name);

        assert.throws(() => {
            validator.notBlank();
        });
    });

    it("should throw an error when the value is an empty string", () => {
        const value = "";
        const name = "emptyString";
        const validator = StringValidator.of(value, name);

        assert.throws(() => {
            validator.notBlank();
        });
    });

    it("should throw an error when the value is a string with only whitespace", () => {
        const value = "   ";
        const name = "whitespaceString";
        const validator = StringValidator.of(value, name);

        assert.throws(() => {
            validator.notBlank();
        });
    });

    it("should not throw an error when the value is a valid non-blank string", () => {
        const value = "validString";
        const name = "validString";
        const validator = StringValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.notBlank();
        });
    });
});
