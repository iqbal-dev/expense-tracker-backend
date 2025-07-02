import { authMiddleware } from '@src/middlewares/auth';
import validateRequest from '@src/middlewares/validateRequest';
import {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
} from '@src/modules/category/v1/category.validation';
import { Router } from 'express';
import * as CategoryController from './category.controller';
const router = Router();
router.post(
  '/',
  authMiddleware,
  validateRequest(createCategoryValidationSchema),
  CategoryController.createCategory,
);

router.patch(
  '/:categoryId',
  authMiddleware,
  validateRequest(createCategoryValidationSchema),
  CategoryController.updateCategory,
);

router.delete(
  '/:categoryId',
  authMiddleware,
  CategoryController.deleteCategory,
);
router.get('/', authMiddleware, CategoryController.getCategories);
router
  .route('/:categoryId')
  .get(authMiddleware, CategoryController.getCategoryById)
  .patch(
    authMiddleware,
    validateRequest(updateCategoryValidationSchema),
    CategoryController.updateCategory,
  )
  .delete(authMiddleware, CategoryController.deleteCategory);
export default router;
