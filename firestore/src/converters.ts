import { Timestamp } from "firebase-admin/firestore";

export function convertToDate(value?: unknown): Date | undefined {
    if (value == null) {
        return undefined;
    } else if (value instanceof Date) {
        return value;
    } else if (value instanceof Timestamp) {
        return value.toDate();
    } else if (typeof value === "object" && "_seconds" in value && "_nanoseconds" in value) {
        const ts = value as { _seconds: number; _nanoseconds: number };
        return new Timestamp(ts._seconds, ts._nanoseconds).toDate();
    }

    throw new Error("Invalid timestamp format: " + JSON.stringify(value));
}