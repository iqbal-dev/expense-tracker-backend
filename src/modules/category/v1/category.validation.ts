import { z } from 'zod';
export const createCategoryValidationSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(60, 'Name should be less than 60 characters')
    .trim()
    .nonempty('Name is required'),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export const updateCategoryValidationSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(60, 'Name should be less than 60 characters')
    .trim()
    .optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
});
