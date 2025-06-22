import { passwordCompare, passwordHash } from '@src/utils/hashing';

describe('Utils - hashing', () => {
  it('should create new hash password', async () => {
    const plainPassword = 'iqbal';
    const hashedPassword = await passwordHash(plainPassword);

    // Check if the hashed password is different and valid
    expect(hashedPassword).not.toBe(plainPassword);
    const isMatch = await passwordCompare(plainPassword, hashedPassword);
    expect(isMatch).toBe(true);
  });
});
