export const delayed = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));
