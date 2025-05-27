import User from './user.model';
import { TCreateUserInput, TUser } from './user.type';

export const createUser = async (input: TCreateUserInput): Promise<TUser> => {
  const user = await User.create(input);
  return user.toObject();
};
