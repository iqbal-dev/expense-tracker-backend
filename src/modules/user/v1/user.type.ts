import { z } from 'zod';
import {
  createUserValidationSchema,
  updateUserPasswordValidationSchema,
  updateUserValidationSchema,
} from './user.validation';

export type TUser = {
  _id: string;
  name: string;
  password: string;
  email: string;
  avatarUrl?: string;
  createdAt?: Date;
  updateAt?: Date;
};

export type TCreateUserInput = z.infer<typeof createUserValidationSchema>;
export type TUpdateUserInput = z.infer<typeof updateUserValidationSchema>;
export type TUpdateUserPasswordInput = z.infer<
  typeof updateUserPasswordValidationSchema
>;
