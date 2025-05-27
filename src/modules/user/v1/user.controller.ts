import { HttpStatus } from '@src/constants/httpStatus';
import { catchAsync } from '@src/utils/catchAsync';
import { sendSuccess } from '@src/utils/sendResponse';
import * as userService from './user.service';

export const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  sendSuccess(res, 'User is created successfully', HttpStatus.CREATED, result);
});
