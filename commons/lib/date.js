"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.differenceInMs = differenceInMs;
function differenceInMs(before, after) {
    return after.getTime() - before.getTime();
}
