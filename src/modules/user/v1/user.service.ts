import { HttpStatus } from '@src/constants/httpStatus';
import { ApiError } from '@src/utils/ApiError';
import { passwordCompare, passwordHash } from '@src/utils/hashing';
import logger from '@src/utils/logger';
import User from './user.model';
import { TCreateUserInput, TUpdateUserInput, TUser } from './user.type';

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

  if (input && input.email) {
    const existingUser = await User.findOne({ email: input.email.trim() });
    if (existingUser) {
      throw new ApiError('Email already exists', HttpStatus.BAD_REQUEST);
    }
  }
  const user = await User.create(input);

  if (!user) {
    throw new ApiError(
      'User creation failed',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
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

/**
 * Retrieves a user by their email address, excluding the password field from the result.
 *
 * @param email - The email address of the user to retrieve.
 * @returns A promise that resolves to the user object without the password field, or null if no user is found.
 */
export const getUserByEmail = async (
  email: string,
): Promise<Omit<TUser, 'password'> | null> => {
  const user = await User.findOne({ email: email.trim() }).select('-password');
  return user ? user?.toObject() : null;
};

export const updateUser = async (
  userId: string,
  input: TUpdateUserInput,
): Promise<Omit<TUser, 'password'>> => {
  if (input.password) {
    input.password = await passwordHash(input.password);
  }

  if (input && input.email) {
    const existingUser = await User.findOne({ email: input.email.trim() });
    if (existingUser && existingUser._id.toString() !== userId) {
      throw new ApiError('Email already exists', HttpStatus.BAD_REQUEST);
    }
  }

  const user = await User.findByIdAndUpdate(userId, input)
    .select('-password')
    .lean();

  if (!user) {
    throw new ApiError('User not found', HttpStatus.NOT_FOUND);
  }

  return { ...user, ...input };
};

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<Omit<TUser, 'password'>> => {
  const user = await User.findById(userId).select('+password');
  logger.info(user);
  if (!user) {
    throw new ApiError('User not found', HttpStatus.NOT_FOUND);
  }

  const isPasswordValid = await passwordCompare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new ApiError('Current password is incorrect', HttpStatus.BAD_REQUEST);
  }

  user.password = await passwordHash(newPassword);
  await user.save();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};
