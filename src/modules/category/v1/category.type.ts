import {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
} from '@src/modules/category/v1/category.validation';
import { z } from 'zod';
export type TCategory = {
  _id: string;
  name: string;
  icon?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TCategoryInput = z.infer<typeof createCategoryValidationSchema>;
export type TCategoryUpdateInput = z.infer<
  typeof updateCategoryValidationSchema
>;
