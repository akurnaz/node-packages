import { DocumentData, Timestamp } from "firebase-admin/firestore";

export class FcmToken {
    readonly value: string;
    readonly updatedDate: Date;

    constructor(props: {
        value: string;
        updatedDate: Date
    }) {
        this.value = props.value;
        this.updatedDate = props.updatedDate;
    }

    public static fromJson(data: DocumentData): FcmToken {
        return new FcmToken({
            value: data.value,
            updatedDate: (data.updatedDate as Timestamp).toDate(),
        });
    }

    public toJson(): DocumentData {
        return {
            value: this.value,
            updatedDate: Timestamp.fromDate(this.updatedDate),
        };
    }
}
