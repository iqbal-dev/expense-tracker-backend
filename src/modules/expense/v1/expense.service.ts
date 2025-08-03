import { HttpStatus } from '@src/constants/httpStatus';
import { getCategoryId } from '@src/modules/category/v1/category.service';
import Expense from '@src/modules/expense/v1/expense.model';
import { TExpenseCreateInput } from '@src/modules/expense/v1/expense.type';
import { getUserById } from '@src/modules/user/v1/user.service';
import { ApiError } from '@src/utils/ApiError';

export const createExpenseService = async (input: TExpenseCreateInput) => {
  const { userId, categoryId } = input;
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError('User not found', HttpStatus.NOT_FOUND);
  }
  await getCategoryId(categoryId);
  const result = await Expense.create(input);
  if (!result) {
    throw new ApiError(
      'Failed to create new expense',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  return result;
};
