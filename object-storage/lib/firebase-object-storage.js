"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseObjectStorage = void 0;
const storage_1 = require("firebase-admin/storage");
const object_metadata_1 = require("./object-metadata");
class FirebaseObjectStorage {
    put(data, path, contentType, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = (0, storage_1.getStorage)().bucket().file(path);
            yield file.save(data, {
                contentType: contentType,
                resumable: false, // TODO
                public: true, // TODO
            });
            const downloadUrl = yield (0, storage_1.getDownloadURL)(file);
            const metadataResponse = yield file.getMetadata();
            const fileMetadata = metadataResponse[0];
            const name = path.split("/").pop();
            return new object_metadata_1.ObjectMetadata({
                name: name,
                path: path,
                downloadUrl: downloadUrl,
                contentType: fileMetadata.contentType,
                size: Number(fileMetadata.size),
                duration: duration,
            });
        });
    }
}
exports.FirebaseObjectStorage = FirebaseObjectStorage;
