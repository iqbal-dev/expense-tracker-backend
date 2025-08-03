import { Types } from 'mongoose';
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
