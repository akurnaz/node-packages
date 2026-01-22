"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysetScrollPosition = exports.TokenScrollPosition = void 0;
class TokenScrollPosition {
    constructor(token) {
        this.token = token;
    }
    static initial() {
        return TokenScrollPosition.empty;
    }
    static of(token) {
        return token == null ? TokenScrollPosition.empty : new TokenScrollPosition(token);
    }
    get isInitial() {
        return this.token == null;
    }
}
exports.TokenScrollPosition = TokenScrollPosition;
TokenScrollPosition.empty = new TokenScrollPosition(undefined);
class KeysetScrollPosition {
    constructor(keys) {
        this.keys = keys;
    }
    static initial() {
        return KeysetScrollPosition.empty;
    }
    static of(keys) {
        return keys == null ? KeysetScrollPosition.empty : new KeysetScrollPosition(Object.freeze(Object.assign({}, keys)));
    }
    get isInitial() {
        return this.keys == null;
    }
}
exports.KeysetScrollPosition = KeysetScrollPosition;
KeysetScrollPosition.empty = new KeysetScrollPosition(undefined);
