export class PaymentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PaymentError";
    }
}

export class ValueError extends PaymentError {
    constructor(message: string) {
        super(message);
        this.name = "ValueError";
    }
}

export class UnauthorizedError extends PaymentError {
    constructor(message: string) {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export class NotFoundError extends PaymentError {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

