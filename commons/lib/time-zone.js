"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeZone = void 0;
class TimeZone {
    constructor(props) {
        this.name = props.name;
        this.offset = props.offset;
    }
    static fromJson(data) {
        return new TimeZone({
            name: data.name,
            offset: data.offset,
        });
    }
    toJson() {
        return {
            name: this.name,
            offset: this.offset,
        };
    }
}
exports.TimeZone = TimeZone;
