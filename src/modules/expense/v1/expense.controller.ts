import { HttpStatus } from '@src/constants/httpStatus';
import { createExpenseService } from '@src/modules/expense/v1/expense.service';
import { catchAsync } from '@src/utils/catchAsync';
import { sendSuccess } from '@src/utils/sendResponse';

export const createExpenseController = catchAsync(async (req, res) => {
  const input = req.body;
  const result = await createExpenseService(input);
  sendSuccess(res, 'Expense created successfully', HttpStatus.CREATED, result);
});
