import { z } from 'zod';

export const createExpenseValidationSchema = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .min(3, 'Title must be at least 3 characters'),

  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .positive('Amount must be greater than 0'),

  date: z.preprocess(
    (val) =>
      typeof val === 'string' || val instanceof Date ? new Date(val) : val,
    z.date({
      required_error: 'Date is required',
      invalid_type_error: 'Must be a valid Date',
    }),
  ),

  categoryId: z.string().nonempty('Category ID is required'),

  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateExpenseValidationSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').optional(),

  userId: z.string().optional(),

  amount: z
    .number({
      invalid_type_error: 'Amount must be a number',
    })
    .positive('Amount must be greater than 0')
    .optional(),

  date: z
    .preprocess(
      (val) =>
        typeof val === 'string' || val instanceof Date ? new Date(val) : val,
      z.date({ invalid_type_error: 'Must be a valid Date' }),
    )
    .optional(),

  categoryId: z.string().optional(),

  notes: z.string().optional(),

  tags: z.array(z.string()).optional(),
});
