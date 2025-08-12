"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectMetadata = void 0;
class ObjectMetadata {
    constructor(props) {
        this.name = props.name;
        this.path = props.path;
        this.downloadUrl = props.downloadUrl;
        this.contentType = props.contentType;
        this.size = props.size;
        this.duration = props.duration;
    }
    static fromJson(json) {
        return new ObjectMetadata({
            name: json.name,
            path: json.path,
            downloadUrl: json.downloadUrl,
            contentType: json.contentType,
            size: json.size,
            duration: json.duration,
        });
    }
    toJson() {
        var _a;
        return {
            name: this.name,
            path: this.path,
            downloadUrl: this.downloadUrl,
            contentType: this.contentType,
            size: this.size,
            duration: (_a = this.duration) !== null && _a !== void 0 ? _a : null,
        };
    }
}
exports.ObjectMetadata = ObjectMetadata;
