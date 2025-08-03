import {
  createExpenseValidationSchema,
  updateExpenseValidationSchema,
} from '@src/modules/expense/v1/expense.validation';
import { Types } from 'mongoose';
import { z } from 'zod';
export type TExpense = {
  _id: string;
  userId: Types.ObjectId;
  title: string;
  amount: number;
  date: Date;
  categoryId: Types.ObjectId;
  notes?: string;
  tags?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TExpenseCreateInput = z.infer<typeof createExpenseValidationSchema>;
export type TExpenseUpdateInput = z.infer<typeof updateExpenseValidationSchema>;
