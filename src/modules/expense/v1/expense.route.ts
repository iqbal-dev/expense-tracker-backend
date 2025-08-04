import validateRequest from '@src/middlewares/validateRequest';
import { createExpenseController } from '@src/modules/expense/v1/expense.controller';
import { createExpenseValidationSchema } from '@src/modules/expense/v1/expense.validation';
import { Router } from 'express';
const router = Router();

router
  .route('/')
  .post(
    validateRequest(createExpenseValidationSchema),
    createExpenseController,
  );

export default router;
