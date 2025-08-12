import { InvalidArgumentError, Nullable, Validator } from "./validator";

export class EnumValidator<T> extends Validator<Nullable<T>> {
    private enumType: object;

    constructor(value: Nullable<T>, name: string, enumType: object) {
        super(value, name);
        this.enumType = enumType;
    }

    public static of<T>(value: Nullable<T>, name: string, enumType: object) {
        return new EnumValidator(value, name, enumType).enum();
    }

    private enum(): EnumValidator<T> {
        if (this.value != null && !Object.values(this.enumType).includes(this.value)) {
            throw new InvalidArgumentError(this.name + " must be a valid enum value");
        }

        return this;
    }

    public notNull(): EnumValidator<T> {
        if (this.value == null) {
            throw new InvalidArgumentError(this.name + " cannot be null");
        }

        return this;
    }
}
