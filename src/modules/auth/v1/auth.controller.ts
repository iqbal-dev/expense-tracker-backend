import { HttpStatus } from '@src/constants/httpStatus';
import { catchAsync } from '@src/utils/catchAsync';
import { sendSuccess } from '@src/utils/sendResponse';
import * as authService from './auth.service';

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  sendSuccess(res, 'User is logged in successfully', HttpStatus.OK, result);
});
