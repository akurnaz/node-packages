"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayed = void 0;
const delayed = (ms) => new Promise((res) => setTimeout(res, ms));
exports.delayed = delayed;
