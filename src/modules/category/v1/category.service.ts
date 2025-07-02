import { HttpStatus } from '@src/constants/httpStatus';
import Category from '@src/modules/category/v1/category.model';
import {
  TCategory,
  TCategoryInput,
  TCategoryUpdateInput,
} from '@src/modules/category/v1/category.type';
import { ApiError } from '@src/utils/ApiError';

/**
 * Creates a new category with the provided input data.
 *
 * @param input - The category input object containing name, icon, and color.
 * @returns A promise that resolves to the created category.
 * @throws {ApiError} If the category creation fails.
 */
export const createCategory = async (
  input: TCategoryInput,
): Promise<TCategory> => {
  const { name, icon, color } = input;
  const category = await Category.create({
    name,
    icon,
    color,
  });
  if (!category) {
    throw new ApiError(
      'Category creation failed',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  return category;
};

/**
 * Updates an existing category with the provided input fields.
 *
 * @param categoryId - The unique identifier of the category to update.
 * @param updateInput - An object containing the fields to update (name, icon, color).
 * @returns A promise that resolves to the updated category.
 * @throws {ApiError} If the category with the given ID is not found.
 */
export const updateCategory = async (
  categoryId: string,
  updateInput: TCategoryUpdateInput,
): Promise<TCategory> => {
  const { name, icon, color } = updateInput;
  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      name,
      icon,
      color,
    },
    { new: true },
  );
  if (!category) {
    throw new ApiError('Category not found', HttpStatus.NOT_FOUND);
  }
  return category;
};

/**
 * Deletes a category by its ID.
 *
 * @param categoryId - The unique identifier of the category to delete.
 * @returns A promise that resolves when the category is deleted.
 * @throws {ApiError} If the category with the given ID is not found.
 */
export const deleteCategory = async (categoryId: string): Promise<void> => {
  const category = await Category.findByIdAndDelete(categoryId);
  if (!category) {
    throw new ApiError('Category not found', HttpStatus.NOT_FOUND);
  }
};

/**
 * Retrieves all categories from the database.
 *
 * @returns {Promise<TCategory[]>} A promise that resolves to an array of category objects.
 * @throws {ApiError} If no categories are found, throws an error with HTTP status NOT_FOUND.
 */
export const getCategories = async (): Promise<TCategory[]> => {
  const categories = await Category.find();
  if (!categories || categories.length === 0) {
    throw new ApiError('No categories found', HttpStatus.NOT_FOUND);
  }
  return categories;
};

/**
 * Retrieves a category by its ID.
 *
 * @param categoryId - The unique identifier of the category to retrieve.
 * @returns A promise that resolves to the found category object.
 * @throws {ApiError} If the category is not found, throws an error with HTTP status NOT_FOUND.
 */
export const getCategoryId = async (categoryId: string): Promise<TCategory> => {
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError('Category not found', HttpStatus.NOT_FOUND);
  }
  return category;
};
