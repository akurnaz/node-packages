"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator = void 0;
class IdGenerator {
    // Automatically Generates a random new Id
    static generate() {
        let result = "";
        const maxRandom = IdGenerator.autoIdAlphabet.length;
        for (let i = 0; i < IdGenerator.autoIdLength; ++i) {
            const randomIndex = Math.floor(Math.random() * maxRandom);
            result += IdGenerator.autoIdAlphabet[randomIndex];
        }
        return result;
    }
}
exports.IdGenerator = IdGenerator;
IdGenerator.autoIdLength = 20;
IdGenerator.autoIdAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
