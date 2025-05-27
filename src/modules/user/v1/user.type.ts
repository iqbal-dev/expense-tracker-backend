import { z } from 'zod';
import { createUserSchema, updateUserSchema } from './user.validation';

export type TUser = {
  name: string;
  password: string;
  email: string;
  createdAt?: Date;
  updateAt?: Date;
};

export type TCreateUserInput = z.infer<typeof createUserSchema>;
export type TUpdateUserInput = z.infer<typeof updateUserSchema>;
