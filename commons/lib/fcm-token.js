"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcmToken = void 0;
const firestore_1 = require("firebase-admin/firestore");
class FcmToken {
    constructor(props) {
        this.value = props.value;
        this.updatedDate = props.updatedDate;
    }
    static fromJson(data) {
        return new FcmToken({
            value: data.value,
            updatedDate: data.updatedDate.toDate(),
        });
    }
    toJson() {
        return {
            value: this.value,
            updatedDate: firestore_1.Timestamp.fromDate(this.updatedDate),
        };
    }
}
exports.FcmToken = FcmToken;
