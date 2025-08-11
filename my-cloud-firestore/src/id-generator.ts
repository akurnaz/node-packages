export class IdGenerator {
    private static readonly autoIdLength = 20;
    private static readonly autoIdAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Automatically Generates a random new Id
    static generate(): string {
        let result = "";
        const maxRandom = IdGenerator.autoIdAlphabet.length;

        for (let i = 0; i < IdGenerator.autoIdLength; ++i) {
            const randomIndex = Math.floor(Math.random() * maxRandom);
            result += IdGenerator.autoIdAlphabet[randomIndex];
        }

        return result;
    }
}
