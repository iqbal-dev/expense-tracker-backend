import User from '@src/modules/user/v1/user.model';
import { TCreateUserInput } from '@src/modules/user/v1/user.type';
import { generateUniqueEmail } from '@src/utils/emailGenerator';

describe('User Model', () => {
  it('create & save a user successfully', async () => {
    const newUser: TCreateUserInput = {
      name: 'Iqbal',
      password: 'iqbal123',
      email: generateUniqueEmail('user'),
    };

    const user = new User(newUser);
    const saveUser = await user.save();
    expect(saveUser._id).toBeDefined();
    expect(saveUser.name).toBe(newUser.name);
    expect(saveUser.email).toBe(newUser.email);
  });
  it('should failed if the required field missing', async () => {
    const newUser = {
      name: 'iqbal',
    };

    const user = new User(newUser);
    let err: unknown;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(Error);
    if (err && typeof err === 'object' && 'errors' in err) {
      const errorObj = err as { errors: Record<string, unknown> };
      expect(errorObj.errors).toHaveProperty('email');
      expect(errorObj.errors).toHaveProperty('password');
    }
  });
  it('should failed if validation failed', async () => {
    const newUser: TCreateUserInput = {
      name: 'i',
      email: 'iqbal',
      password: '1232323',
    };

    const user = new User(newUser);
    let err: unknown;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(Error);
    if (err && typeof err === 'object' && 'errors' in err) {
      const errorObj = err as { errors: Record<string, unknown> };
      expect(errorObj.errors).toHaveProperty('email');
      expect(errorObj.errors).toHaveProperty('name');
    }
  });
});
