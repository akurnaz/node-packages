import { ScrollPosition } from "./scroll_position";

export abstract class Window<T> {
    static from<T>(params: { content: T[]; nextPosition: ScrollPosition; hasNext: boolean }): Window<T> {
        const { content, nextPosition, hasNext } = params;
        return new WindowImpl<T>(content, nextPosition, hasNext);
    }

    abstract readonly content: T[];
    abstract readonly nextPosition: ScrollPosition;
    abstract readonly hasNext: boolean;

    abstract map<U>(toElement: (item: T) => U): Window<U>;
}

class WindowImpl<T> extends Window<T> {
    constructor(
        public readonly content: T[],
        public readonly nextPosition: ScrollPosition,
        public readonly hasNext: boolean,
    ) {
        super();
    }

    map<U>(toElement: (item: T) => U): Window<U> {
        return new WindowImpl<U>(this.content.map(toElement), this.nextPosition, this.hasNext);
    }
}
