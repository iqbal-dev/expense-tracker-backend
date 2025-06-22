import { passwordHash } from '@src/utils/hashing';
import User from './user.model';
import { TCreateUserInput, TUser } from './user.type';

export const createUser = async (input: TCreateUserInput): Promise<Omit<TUser, 'password'>> => {
  input.password = await passwordHash(input.password);
  const user = await User.create(input);
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};
