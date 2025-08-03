import Expense from '@src/modules/expense/v1/expense.model';
import mongoose from 'mongoose';

describe('Expense Model Test', () => {
  it('should create and save an expense successfully', async () => {
    const result = await Expense.create({
      userId: new mongoose.Types.ObjectId(),
      title: 'Groceries',
      amount: 500.5,
      date: new Date('2025-08-01'),
      categoryId: new mongoose.Types.ObjectId(),
      notes: 'Weekly shopping',
      tags: ['food', 'necessity'],
    });

    expect(result._id).toBeDefined();
    expect(result.title).toBe('Groceries');
  });
});
