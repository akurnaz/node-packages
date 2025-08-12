import { ObjectMetadata } from "./object-metadata";
export declare class FirebaseObjectStorage {
    put(data: Buffer, path: string, contentType: string, duration?: number): Promise<ObjectMetadata>;
}
