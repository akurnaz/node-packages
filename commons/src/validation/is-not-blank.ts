import { registerDecorator, ValidationOptions } from "class-validator";

export function IsNotBlank(property?: string, validationOptions?: ValidationOptions) {
    return function(object: object, propertyName: string) {
        registerDecorator({
            name: "isNotBlank",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: unknown) {
                    return typeof value === "string" && value.trim().length > 0;
                },
            },
        });
    };
}
