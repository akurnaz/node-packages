import { DocumentData } from "firebase-admin/firestore";
export declare class FcmToken {
    readonly value: string;
    readonly updatedDate: Date;
    constructor(props: {
        value: string;
        updatedDate: Date;
    });
    static fromJson(data: DocumentData): FcmToken;
    toJson(): DocumentData;
}
