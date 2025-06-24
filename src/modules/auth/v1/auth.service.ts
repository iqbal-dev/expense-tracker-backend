import { HttpStatus } from '@src/constants/httpStatus';
import User from '@src/modules/user/v1/user.model';
import { ApiError } from '@src/utils/ApiError';
import { passwordCompare } from '@src/utils/hashing';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@src/utils/jwt';

/**
 * Authenticates a user with the provided email and password.
 *
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns An object containing the accessToken and refreshToken.
 * @throws {ApiError} If email or password is missing, user is not found, or password is invalid.
 */
export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new ApiError(
      'Email and password are required',
      HttpStatus.BAD_REQUEST,
    );
  }
  const user = await User.findOne({ email: email.trim() });

  if (!user) {
    throw new ApiError('User not found', HttpStatus.NOT_FOUND);
  }

  const { password: userPassword, ...userWithoutPassword } = user.toObject();
  const isPasswordCorrect = await passwordCompare(password, userPassword);
  if (!isPasswordCorrect) {
    throw new ApiError('Invalid password', HttpStatus.UNAUTHORIZED);
  }

  const payload = { userId: userWithoutPassword._id.toString() };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken };
};

export const getAccessToken = async (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded || !decoded.userId) {
    throw new ApiError(
      'Invalid or expired refresh token',
      HttpStatus.UNAUTHORIZED,
    );
  }
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new ApiError('User not found', HttpStatus.NOT_FOUND);
  }

  const payload = { userId: user._id.toString() };
  const accessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken: newRefreshToken };
};
