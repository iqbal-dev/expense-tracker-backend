import { HttpStatus } from '@src/constants/httpStatus';
import { catchAsync } from '@src/utils/catchAsync';
import { sendSuccess } from '@src/utils/sendResponse';
import * as categoryService from './category.service';

/**
 * Creates a new category using the provided name, icon, and color from the request body.
 *
 * @function
 * @async
 * @param req - Express request object containing category details in the body.
 * @param res - Express response object used to send the success response.
 * @returns {Promise<void>} Sends a success response with the created category data.
 *
 * @throws Will propagate any errors to the catchAsync error handler.
 */
export const createCategory = catchAsync(async (req, res) => {
  const { name, icon, color } = req.body;
  const category = await categoryService.createCategory({
    name,
    icon,
    color,
  });
  sendSuccess(
    res,
    'Category created successfully',
    HttpStatus.CREATED,
    category,
  );
});

/**
 * Updates an existing category with the provided data.
 *
 * @param req - Express request object containing the category ID in params and update data in the body.
 * @param res - Express response object used to send the success response.
 * @returns A promise that resolves to the updated category and sends a success response.
 *
 * @throws {NotFoundError} If the category with the specified ID does not exist.
 * @throws {ValidationError} If the update input is invalid.
 */
export const updateCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const updateInput = req.body;
  const updatedCategory = await categoryService.updateCategory(
    categoryId,
    updateInput,
  );
  sendSuccess(
    res,
    'Category updated successfully',
    HttpStatus.OK,
    updatedCategory,
  );
});

/**
 * Deletes a category by its ID.
 *
 * @param req - Express request object containing the category ID in `req.params.categoryId`.
 * @param res - Express response object used to send the success response.
 * @returns A promise that resolves after the category is deleted and a success response is sent.
 *
 * @throws Will propagate any errors thrown by the categoryService.
 */
export const deleteCategory = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  await categoryService.deleteCategory(categoryId);
  sendSuccess(res, 'Category deleted successfully', HttpStatus.NO_CONTENT);
});

/**
 * Controller to handle retrieving all categories.
 *
 * @route GET /categories
 * @async
 * @function
 * @param req - Express request object
 * @param res - Express response object
 * @returns Sends a success response with the list of categories.
 */
export const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getCategories();
  sendSuccess(
    res,
    'Categories retrieved successfully',
    HttpStatus.OK,
    categories,
  );
});

/**
 * Retrieves a category by its ID.
 *
 * @param req - Express request object containing the category ID in `req.params.categoryId`.
 * @param res - Express response object used to send the response.
 * @returns A promise that resolves after sending the category data in the response.
 *
 * @throws Will forward any errors to the error handler via `catchAsync`.
 */
export const getCategoryById = catchAsync(async (req, res) => {
  const { categoryId } = req.params;
  const category = await categoryService.getCategoryId(categoryId);
  sendSuccess(res, 'Category retrieved successfully', HttpStatus.OK, category);
});
