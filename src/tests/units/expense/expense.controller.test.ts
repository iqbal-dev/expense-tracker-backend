import { HttpStatus } from '@src/constants/httpStatus';
import { createExpenseController } from '@src/modules/expense/v1/expense.controller';
import * as expenseService from '@src/modules/expense/v1/expense.service';
import { Request } from 'express';

jest.mock('@src/modules/expense/v1/expense.service');

describe('Expense Service', () => {
  const mockReq = {
    body: {
      userId: 'user123',
      title: 'Lunch',
      amount: 100,
      date: new Date(),
      categoryId: 'cat123',
      notes: 'Work lunch',
      tags: ['food'],
    },
  } as Partial<Request> as Request;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockRes: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const mockNext = jest.fn();

  const mockExpense = {
    ...mockReq.body,
    _id: 'expense123',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an expense successfully', async () => {
    (expenseService.createExpenseService as jest.Mock).mockResolvedValue(
      mockExpense,
    );
    await createExpenseController(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Expense created successfully',
      data: mockExpense,
      success: true,
    });
  });
});
