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
    expect(result.amount).toBe(500.5);
    expect(result.tags).toContain('food');
  });
  it('should fail to create expense without required fields', async () => {
    try {
      await Expense.create({});
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        expect(error.errors.title.message).toBe('Title is required');
        expect(error.errors.amount.message).toBe('Amount is required');
        expect(error.errors.userId.message).toBe('User ID is required');
        expect(error.errors.categoryId.message).toBe('Category ID is required');
      } else {
        throw error;
      }
    }
  });
});
