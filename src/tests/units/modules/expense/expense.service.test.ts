describe('Math Test', () => {
  it('should add numbers correctly', () => {
    expect(2 + 3).toBe(5);
  });
});
describe('Array Test', () => {
  it('should include banana in fruits', () => {
    const fruits = ['apple', 'banana', 'cherry'];
    expect(fruits).toContain('banana');
  });
});
describe('Boolean Test', () => {
  it('should be truthy', () => {
    const value = 1;
    expect(value).toBeTruthy();
  });
});
describe('Object Test', () => {
  it('should match the object structure', () => {
    const user = { name: 'Alice', age: 25 };
    expect(user).toEqual({ name: 'Alice', age: 25 });
  });
});
describe('Async Test', () => {
  it('should resolve with success', async () => {
    const dummyFetch = () => Promise.resolve('success');
    await expect(dummyFetch()).resolves.toBe('success');
  });
});
