import { createUser, updateUser } from '@src/modules/user/v1/user.service';
import { TCreateUserInput } from '@src/modules/user/v1/user.type';
import { generateUniqueEmail } from '@src/utils/emailGenerator';

describe('User Service', () => {
  const baseUser: Omit<TCreateUserInput, 'email'> = {
    name: 'Test User',
    password: 'Password1!',
  };

  const generateUser = (prefix = 'user'): TCreateUserInput => ({
    ...baseUser,
    email: generateUniqueEmail(prefix),
  });

  const createTestUser = async (prefix = 'user') => {
    const user = generateUser(prefix);
    return await createUser(user);
  };

  describe('createUser()', () => {
    it('should create and return a new user', async () => {
      const userInput = generateUser('newUser');
      const user = await createUser(userInput);
      expect(user).toHaveProperty('_id');
      expect(user.name).toBe(userInput.name);
      expect(user.email.toLowerCase()).toBe(userInput.email.toLowerCase());
    });

    it('should throw an error if email already exists', async () => {
      const email = generateUniqueEmail('duplicate');
      const userInput = { ...baseUser, email };

      await createUser(userInput); // First time succeeds

      // Second time should throw
      await expect(createUser(userInput)).rejects.toThrow(
        'Email already exists',
      );
    });

    it('should throw an error if required fields are missing', async () => {
      const invalidUser = {
        name: 'Invalid User',
      } as TCreateUserInput;

      await expect(createUser(invalidUser)).rejects.toThrow();
    });
  });

  describe('updateUser()', () => {
    it('should throw an error if user not found', async () => {
      const invalidUserId = '60c72b2f9b1d8c001c8e4f1a';
      const updatedData = { name: 'Updated Name' };

      await expect(updateUser(invalidUserId, updatedData)).rejects.toThrow(
        'User not found',
      );
    });

    it('should throw an error if updated email already exists', async () => {
      const user1 = await createTestUser('user1');
      const user2 = await createTestUser('user2');

      await expect(
        updateUser(user1._id, { email: user2.email }),
      ).rejects.toThrow('Email already exists');
    });

    it('should update user profile successfully', async () => {
      const user = await createTestUser('update');
      const updatedData = {
        name: 'Updated Iqbal',
        email: `updated+${Date.now()}@test.com`,
      };

      const updatedUser = await updateUser(user._id, updatedData);

      expect(updatedUser._id.toString()).toBe(user._id.toString());
      expect(updatedUser.name).toBe(updatedData.name);
      expect(updatedUser.email).toBe(updatedData.email);
    });
  });
});
