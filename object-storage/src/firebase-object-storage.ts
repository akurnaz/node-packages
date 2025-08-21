import { getDownloadURL, getStorage } from "firebase-admin/storage";
import { ObjectMetadata } from "./object-metadata";
import { Bucket } from '@google-cloud/storage';

export class FirebaseObjectStorage {
    private readonly bucket: Bucket;

    constructor(bucket: Bucket) {
        this.bucket = bucket;
    }

    public async put(data: Buffer, path: string, contentType: string, duration?: number): Promise<ObjectMetadata> {
        const file = this.bucket.file(path);

        await file.save(data, {
            contentType: contentType,
            private: true,
        });

        const downloadUrl = await getDownloadURL(file);

        const metadataResponse = await file.getMetadata();

        const fileMetadata = metadataResponse[0];
        const name = path.split("/").pop();

        return new ObjectMetadata(
            {
                name: name!,
                path: path,
                downloadUrl: downloadUrl,
                contentType: fileMetadata.contentType!,
                size: Number(fileMetadata.size),
                duration: duration,
            }
        );
    }

    public async delete(path: string): Promise<void> {
        const file = this.bucket.file(path);

        await file.delete({ ignoreNotFound: true });
    }
}
