import { ScrollPosition } from "./scroll_position";
export declare abstract class Window<T> {
    static from<T>(params: {
        content: T[];
        nextPosition: ScrollPosition;
        hasNext: boolean;
    }): Window<T>;
    abstract readonly content: T[];
    abstract readonly nextPosition: ScrollPosition;
    abstract readonly hasNext: boolean;
    abstract map<U>(toElement: (item: T) => U): Window<U>;
}
