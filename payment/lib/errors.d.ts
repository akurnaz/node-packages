export declare class PaymentError extends Error {
    constructor(message: string);
}
export declare class ValueError extends PaymentError {
    constructor(message: string);
}
export declare class UnauthorizedError extends PaymentError {
    constructor(message: string);
}
export declare class NotFoundError extends PaymentError {
    constructor(message: string);
}
