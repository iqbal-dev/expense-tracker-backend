import { generateAccessToken, verifyAccessToken } from '@src/utils/jwt';

describe('JWT', () => {
  it('should generate a valid JWT token', () => {
    const token = generateAccessToken({ userId: '123', role: 'admin' });
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
  it('should verify a valid JWT token', () => {
    const token = generateAccessToken({ userId: '123', role: 'admin' });
    const decoded = verifyAccessToken(token);
    expect(decoded).toBeDefined();
    expect(decoded).toHaveProperty('userId', '123');
    expect(decoded).toHaveProperty('role', 'admin');
  });
  it('should return null for an invalid JWT token', () => {
    const invalid = 'invalid.token.string';
    const decoded = verifyAccessToken(invalid);
    expect(decoded).toBeNull();
  });
  it('should return null for an expired JWT token', () => {
    // Generate a token that expires immediately
    const token = generateAccessToken(
      { userId: '123', role: 'admin' },
      { expiresIn: '1ms' },
    );
    // Wait for the token to expire
    setTimeout(() => {
      const decoded = verifyAccessToken(token);
      expect(decoded).toBeNull();
    }, 10);
  });
});
