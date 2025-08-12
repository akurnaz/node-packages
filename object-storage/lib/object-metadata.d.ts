import { DocumentData } from "firebase-admin/firestore";
export declare class ObjectMetadata {
    name: string;
    path: string;
    downloadUrl: string;
    contentType: string;
    size: number;
    duration?: number;
    constructor(props: {
        name: string;
        path: string;
        downloadUrl: string;
        contentType: string;
        size: number;
        duration?: number;
    });
    static fromJson(json: DocumentData): ObjectMetadata;
    toJson(): DocumentData;
}
