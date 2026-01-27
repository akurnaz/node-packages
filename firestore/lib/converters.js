"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToDate = convertToDate;
const firestore_1 = require("firebase-admin/firestore");
function convertToDate(value) {
    if (value == null) {
        return undefined;
    }
    else if (value instanceof Date) {
        return value;
    }
    else if (value instanceof firestore_1.Timestamp) {
        return value.toDate();
    }
    else if (typeof value === "object" && "_seconds" in value && "_nanoseconds" in value) {
        const ts = value;
        return new firestore_1.Timestamp(ts._seconds, ts._nanoseconds).toDate();
    }
    throw new Error("Invalid timestamp format: " + JSON.stringify(value));
}
