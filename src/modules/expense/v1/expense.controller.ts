import { HttpStatus } from '@src/constants/httpStatus';
import { createExpenseService } from '@src/modules/expense/v1/expense.service';
import { ApiError } from '@src/utils/ApiError';
import { catchAsync } from '@src/utils/catchAsync';
import { sendSuccess } from '@src/utils/sendResponse';

export const createExpenseController = catchAsync(async (req, res) => {
  const input = req.body;
  if (!req.user?.userId) {
    throw new ApiError('User ID is required', HttpStatus.BAD_REQUEST);
  }

  console.log('+++++++', req.user?.userId);
  const result = await createExpenseService({
    ...input,
    userId: req.user?.userId,
  });
  sendSuccess(res, 'Expense created successfully', HttpStatus.CREATED, result);
});
