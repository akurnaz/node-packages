"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.UnauthorizedError = exports.ValueError = exports.PaymentError = void 0;
class PaymentError extends Error {
    constructor(message) {
        super(message);
        this.name = "PaymentError";
    }
}
exports.PaymentError = PaymentError;
class ValueError extends PaymentError {
    constructor(message) {
        super(message);
        this.name = "ValueError";
    }
}
exports.ValueError = ValueError;
class UnauthorizedError extends PaymentError {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
    }
}
exports.UnauthorizedError = UnauthorizedError;
class NotFoundError extends PaymentError {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
