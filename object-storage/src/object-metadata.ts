import { DocumentData } from "firebase-admin/firestore";

export class ObjectMetadata {
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
    }) {
        this.name = props.name;
        this.path = props.path;
        this.downloadUrl = props.downloadUrl;
        this.contentType = props.contentType;
        this.size = props.size;
        this.duration = props.duration;
    }

    public static fromJson(json: DocumentData): ObjectMetadata {
        return new ObjectMetadata({
            name: json.name,
            path: json.path,
            downloadUrl: json.downloadUrl,
            contentType: json.contentType,
            size: json.size,
            duration: json.duration,
        });
    }

    public toJson(): DocumentData {
        return {
            name: this.name,
            path: this.path,
            downloadUrl: this.downloadUrl,
            contentType: this.contentType,
            size: this.size,
            duration: this.duration ?? null,
        };
    }
}
