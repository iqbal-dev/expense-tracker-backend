import User from '@src/modules/user/v1/user.model';
import { createUser } from '@src/modules/user/v1/user.service';
import { TCreateUserInput } from '@src/modules/user/v1/user.type';

const validUser: TCreateUserInput = {
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'Password1!',
};

describe('User Service - createUser', () => {
  afterEach(async () => {
    await User.deleteMany(); // clean up after each test
  });

  it('should create and return a new user', async () => {
    const user = await createUser(validUser);

    expect(user).toHaveProperty('_id');
    expect(user.name).toBe(validUser.name);
    expect(user.email).toBe(validUser.email);
  });

  it('should throw an error if email already exists', async () => {
    try {
      await createUser(validUser);
    } catch (error) {
      expect(error).toThrow();
    }
  });
});
