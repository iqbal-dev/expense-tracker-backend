import { TExpense } from '@src/modules/expense/v1/expense.type';
import { Schema, model } from 'mongoose';

const expenseSchema = new Schema<TExpense>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Category ID is required'],
      ref: 'Category',
    },
    notes: {
      type: String,
      required: false,
    },
    tags: {
      type: [String],
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Expense = model<TExpense>('Expense', expenseSchema);
export default Expense;
