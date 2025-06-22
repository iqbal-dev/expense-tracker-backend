import { HttpStatus } from '@src/constants/httpStatus';
import User from '@src/modules/user/v1/user.model';
import { ApiError } from '@src/utils/ApiError';
import { passwordCompare } from '@src/utils/hashing';
import { generateToken } from '@src/utils/jwt';

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email: email.trim() });

  if (!user) {
    throw new ApiError('User not found', HttpStatus.NOT_FOUND);
  }

  const { password: userPassword, ...userWithoutPassword } = user.toObject();
  const isPasswordCorrect = await passwordCompare(password, userPassword);
  if (!isPasswordCorrect) {
    throw new ApiError('Invalid password', HttpStatus.UNAUTHORIZED);
  }

  const token = generateToken({ userId: userWithoutPassword._id.toString() });

  return { user: userWithoutPassword, token };
};
