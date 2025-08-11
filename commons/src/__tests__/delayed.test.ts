import { delayed } from '../delayed';

describe('delayed', () => {
  it('should resolve after given ms', async () => {
    const start = Date.now();
    await delayed(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });
});
