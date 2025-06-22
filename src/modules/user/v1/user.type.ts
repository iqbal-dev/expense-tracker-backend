import { z } from 'zod';
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from './user.validation';

export type TUser = {
  name: string;
  password: string;
  email: string;
  avatarUrl?: string;
  createdAt?: Date;
  updateAt?: Date;
};

export type TCreateUserInput = z.infer<typeof createUserValidationSchema>;
export type TUpdateUserInput = z.infer<typeof updateUserValidationSchema>;
