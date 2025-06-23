import { HttpStatus } from '@src/constants/httpStatus';
import { ApiError } from '@src/utils/ApiError';
import { catchAsync } from '@src/utils/catchAsync';
import { sendSuccess } from '@src/utils/sendResponse';
import * as userService from './user.service';

/**
 * Handles the creation of a new user.
 *
 * @param req - Express request object containing user data in the body.
 * @param res - Express response object used to send the response.
 * @returns A Promise that resolves when the user is created and a success response is sent.
 *
 * @remarks
 * This controller uses the `userService.createUser` method to create a new user
 * and sends a standardized success response using `sendSuccess`.
 * Errors are handled by the `catchAsync` utility.
 */
export const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  sendSuccess(res, 'User is created successfully', HttpStatus.CREATED, result);
});

/**
 * Handles the retrieval of the authenticated user's profile.
 *
 * This controller function extracts the user ID from the request object,
 * validates its presence, and fetches the corresponding user profile using the user service.
 * It sends an appropriate HTTP response based on whether the user ID is provided
 * and whether the user exists in the database.
 *
 * @function
 * @async
 * @param req - Express request object, expected to have `user.userId` property.
 * @param res - Express response object used to send the response.
 * @returns {Promise<void>} Sends a JSON response with user profile data or an error message.
 *
 * @throws Will not throw; errors are handled by `catchAsync`.
 */
export const getUserProfile = catchAsync(async (req, res) => {
  if (!req.user?.userId) {
    throw new ApiError('User ID is required', HttpStatus.BAD_REQUEST);
  }
  const result = await userService.getUserById(req.user?.userId);
  if (!result) {
    throw new ApiError('User not found', HttpStatus.NOT_FOUND);
  }
  sendSuccess(
    res,
    'User profile retrieved successfully',
    HttpStatus.OK,
    result,
  );
});
