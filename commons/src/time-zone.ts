import { DocumentData } from "firebase-admin/firestore";

export class TimeZone {
    readonly name: string;

    /**
     * UTC offset in minutes.
     */
    readonly offset: number;

    constructor(props: {
        name: string,
        offset: number
    }) {
        this.name = props.name;
        this.offset = props.offset;
    }

    public static fromJson(data: DocumentData): TimeZone {
        return new TimeZone({
            name: data.name,
            offset: data.offset,
        });
    }

    public toJson(): DocumentData {
        return {
            name: this.name,
            offset: this.offset,
        };
    }
}
