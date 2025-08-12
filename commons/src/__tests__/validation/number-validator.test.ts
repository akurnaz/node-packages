import { strict as assert } from "assert";
import { NumberValidator } from "../../validation/number-validator";

describe("NumberValidator.of", () => {
    it("should throw an error when the value is not a number", () => {
        const value = "notANumber" as unknown as number;
        const name = "stringNumber";

        assert.throws(() => {
            NumberValidator.of(value, name);
        });
    });
});

describe("NumberValidator.notNull", () => {
    it("should throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.notNull();
        });
    });

    it("should throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "nullNumber";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.notNull();
        });
    });

    it("should not throw an error when the value is a valid integer", () => {
        const value = 10;
        const name = "validInteger";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.notNull();
        });
    });
});

describe("NumberValidator.integer", () => {
    it("should not throw an error when the value is null", () => {
        const value = null;
        const name = "nullInteger";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.integer();
        });
    });

    it("should not throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedInteger";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.integer();
        });
    });

    it("should throw an error when the value is a float", () => {
        const value = 10.5;
        const name = "floatValue";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.integer();
        });
    });

    it("should not throw an error when the value is an integer", () => {
        const value = 10;
        const name = "validInteger";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.integer();
        });
    });
});

describe("NumberValidator.min", () => {
    it("should not throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.min(5);
        });
    });

    it("should not throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedNumber";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.min(5);
        });
    });

    it("should throw an error when the value is less than the minimum", () => {
        const value = 3;
        const name = "lessThanMin";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.min(5);
        });
    });

    it("should not throw an error when the value is equal to the minimum", () => {
        const value = 5;
        const name = "equalToMin";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.min(5);
        });
    });

    it("should not throw an error when the value is greater than the minimum", () => {
        const value = 10;
        const name = "greaterThanMin";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.min(5);
        });
    });
});

describe("NumberValidator.max", () => {
    it("should not throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.max(5);
        });
    });

    it("should not throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedNumber";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.max(5);
        });
    });

    it("should throw an error when the value is greater than the maximum", () => {
        const value = 10;
        const name = "greaterThanMax";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.max(5);
        });
    });

    it("should not throw an error when the value is equal to the maximum", () => {
        const value = 5;
        const name = "equalToMax";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.max(5);
        });
    });

    it("should not throw an error when the value is less than the maximum", () => {
        const value = 3;
        const name = "lessThanMax";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.max(5);
        });
    });
});

describe("NumberValidator.negative", () => {
    it("should not throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.negative();
        });
    });

    it("should not throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedNumber";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.negative();
        });
    });

    it("should throw an error when the value is 0", () => {
        const value = 0;
        const name = "zeroInteger";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.negative();
        });
    });

    it("should throw an error when the value is 0.0", () => {
        const value = 0.0;
        const name = "zeroFloat";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.negative();
        });
    });

    it("should not throw an error when the value is negative integer", () => {
        const value = -5;
        const name = "negativeInteger";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.negative();
        });
    });

    it("should not throw an error when the value is a negative float", () => {
        const value = -10.5;
        const name = "negativeFloat";
        const validator = NumberValidator.of(value, name);
        assert.doesNotThrow(() => {
            validator.negative();
        });
    });

    it("should throw an error when the value is a positive integer", () => {
        const value = 10;
        const name = "positiveInteger";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.negative();
        });
    });

    it("should throw an error when the value is a positive float", () => {
        const value = 10.5;
        const name = "positiveFloat";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.negative();
        });
    });
});

describe("NumberValidator.positive", () => {
    it("should not throw an error when the value is null", () => {
        const value = null;
        const name = "nullNumber";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.positive();
        });
    });

    it("should not throw an error when the value is undefined", () => {
        const value = undefined;
        const name = "undefinedNumber";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.positive();
        });
    });

    it("should throw an error when the value is 0", () => {
        const value = 0;
        const name = "zeroInteger";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.positive();
        });
    });

    it("should throw an error when the value is 0.0", () => {
        const value = 0.0;
        const name = "zeroFloat";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.positive();
        });
    });

    it("should throw an error when the value is negative integer", () => {
        const value = -5;
        const name = "negativeInteger";
        const validator = NumberValidator.of(value, name);

        assert.throws(() => {
            validator.positive();
        });
    });

    it("should throw an error when the value is a negative float", () => {
        const value = -10.5;
        const name = "negativeFloat";
        const validator = NumberValidator.of(value, name);
        assert.throws(() => {
            validator.positive();
        });
    });

    it("should not throw an error when the value is a positive integer", () => {
        const value = 10;
        const name = "positiveInteger";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.positive();
        });
    });

    it("should not throw an error when the value is a positive float", () => {
        const value = 10.5;
        const name = "positiveFloat";
        const validator = NumberValidator.of(value, name);

        assert.doesNotThrow(() => {
            validator.positive();
        });
    });
});
