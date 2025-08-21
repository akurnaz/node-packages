import { ObjectMetadata } from "./object-metadata";
import { Bucket } from '@google-cloud/storage';
export declare class FirebaseObjectStorage {
    private readonly bucket;
    constructor(bucket: Bucket);
    put(data: Buffer, path: string, contentType: string, duration?: number): Promise<ObjectMetadata>;
    delete(path: string): Promise<void>;
}
