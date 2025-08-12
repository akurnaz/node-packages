import { Nullable, Validator } from "./validator";
export declare class EnumValidator<T> extends Validator<Nullable<T>> {
    private enumType;
    constructor(value: Nullable<T>, name: string, enumType: object);
    static of<T>(value: Nullable<T>, name: string, enumType: object): EnumValidator<T>;
    private enum;
    notNull(): EnumValidator<T>;
}
