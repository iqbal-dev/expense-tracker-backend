import authRoute from '@src/modules/auth/v1/auth.route';
import categoryRoute from '@src/modules/category/v1/category.route';
import expenseRoute from '@src/modules/expense/v1/expense.route';
import userRoute from '@src/modules/user/v1/user.route';
import { Router } from 'express';

const router = Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/categories', categoryRoute);
router.use('/expenses', expenseRoute);
export default router;
