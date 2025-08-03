/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@src/constants/httpStatus';
import * as categoryService from '@src/modules/category/v1/category.service';
import Expense from '@src/modules/expense/v1/expense.model';
import { createExpenseService } from '@src/modules/expense/v1/expense.service';
import * as userService from '@src/modules/user/v1/user.service';
import { ApiError } from '@src/utils/ApiError';

jest.mock('@src/modules/user/v1/user.service');
jest.mock('@src/modules/category/v1/category.service');
jest.mock('@src/modules/expense/v1/expense.model');

const mockedUserService = userService as jest.Mocked<typeof userService>;
const mockedCategoryService = categoryService as jest.Mocked<
  typeof categoryService
>;
const mockedExpenseModel = Expense as jest.Mocked<typeof Expense>;

describe('create category service', () => {
  const validInput = {
    userId: 'user123',
    title: 'Groceries',
    amount: 100,
    date: new Date(),
    categoryId: 'category123',
    notes: 'Weekly groceries',
    tags: ['food'],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an expense successfully', async () => {
    mockedUserService.getUserById.mockResolvedValue({
      _id: 'user123',
      email: 'user@example.com',
    } as any);

    mockedCategoryService.getCategoryId.mockResolvedValue({
      _id: 'category123',
      name: 'Food',
    } as any);

    mockedExpenseModel.create.mockResolvedValue({
      ...validInput,
      _id: 'expense123',
    } as any);

    const result = await createExpenseService(validInput);
    expect(result).toHaveProperty('_id', 'expense123');
    expect(mockedUserService.getUserById).toHaveBeenCalledWith('user123');
    expect(mockedCategoryService.getCategoryId).toHaveBeenCalledWith(
      'category123',
    );
    expect(mockedExpenseModel.create).toHaveBeenCalledWith(validInput);
  });

  it('should throw an error if user not found', async () => {
    mockedUserService.getUserById.mockResolvedValue(null);

    await expect(createExpenseService(validInput)).rejects.toThrow(ApiError);
    await expect(createExpenseService(validInput)).rejects.toMatchObject({
      message: 'User not found',
      statusCode: HttpStatus.NOT_FOUND,
    });

    expect(mockedUserService.getUserById).toHaveBeenCalled();
    expect(mockedExpenseModel.create).not.toHaveBeenCalled();
  });

  it('should throw an error if Expense.create fails', async () => {
    mockedUserService.getUserById.mockResolvedValue({ _id: 'user123' } as any);
    mockedCategoryService.getCategoryId.mockResolvedValue({
      _id: 'category123',
    } as any);
    mockedExpenseModel.create.mockResolvedValue(null as any);

    await expect(createExpenseService(validInput)).rejects.toThrow(ApiError);
    await expect(createExpenseService(validInput)).rejects.toMatchObject({
      message: 'Failed to create new expense',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  });
});
