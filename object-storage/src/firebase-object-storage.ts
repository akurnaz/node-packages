import { getDownloadURL, getStorage } from "firebase-admin/storage";
import { ObjectMetadata } from "./object-metadata";

export class FirebaseObjectStorage {
    public async put(data: Buffer, path: string, contentType: string, duration?: number): Promise<ObjectMetadata> {
        const file = getStorage().bucket().file(path);

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
}
