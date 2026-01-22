"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Window = void 0;
class Window {
    static from(params) {
        const { content, nextPosition, hasNext } = params;
        return new WindowImpl(content, nextPosition, hasNext);
    }
}
exports.Window = Window;
class WindowImpl extends Window {
    constructor(content, nextPosition, hasNext) {
        super();
        this.content = content;
        this.nextPosition = nextPosition;
        this.hasNext = hasNext;
    }
    map(toElement) {
        return new WindowImpl(this.content.map(toElement), this.nextPosition, this.hasNext);
    }
}
