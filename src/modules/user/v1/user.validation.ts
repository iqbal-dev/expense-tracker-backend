import { z } from 'zod';
import { passwordRegex } from './user.utils';
export const createUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .regex(
      passwordRegex,
      'Password must be at least 6 characters and include one uppercase letter, one number, and one special character',
    ),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z
    .string()
    .regex(
      passwordRegex,
      'Password must be at least 6 characters and include one uppercase letter, one number, and one special character',
    )
    .optional(),
});
