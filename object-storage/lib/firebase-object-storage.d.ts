import { Bucket } from '@google-cloud/storage';
import { ObjectMetadata } from "./object-metadata";
export declare class FirebaseObjectStorage {
    private readonly bucket;
    constructor(bucket: Bucket);
    put(data: Buffer, path: string, contentType: string, duration?: number): Promise<ObjectMetadata>;
    deleteFiles(prefix: string): Promise<void>;
}
