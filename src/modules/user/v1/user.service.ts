import { passwordHash } from '@src/utils/hashing';
import User from './user.model';
import { TCreateUserInput, TUser } from './user.type';

/**
 * Creates a new user with the provided input data.
 * Hashes the user's password before saving to the database.
 * Returns the created user object without the password field.
 *
 * @param input - The user data required to create a new user.
 * @returns A promise that resolves to the created user object, excluding the password.
 */
export const createUser = async (
  input: TCreateUserInput,
): Promise<Omit<TUser, 'password'>> => {
  input.password = await passwordHash(input.password);
  const user = await User.create(input);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

/**
 * Retrieves a user by their unique identifier, excluding the password field from the result.
 *
 * @param userId - The unique identifier of the user to retrieve.
 * @returns A promise that resolves to the user object without the password field, or null if the user is not found.
 */
export const getUserById = async (
  userId: string,
): Promise<Omit<TUser, 'password'> | null> => {
  const user = await User.findById(userId).select('-password');
  return user ? user?.toObject() : null;
};
