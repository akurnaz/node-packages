import { DocumentData } from "firebase-admin/firestore";
export declare class TimeZone {
    readonly name: string;
    /**
     * UTC offset in minutes.
     */
    readonly offset: number;
    constructor(props: {
        name: string;
        offset: number;
    });
    static fromJson(data: DocumentData): TimeZone;
    toJson(): DocumentData;
}
