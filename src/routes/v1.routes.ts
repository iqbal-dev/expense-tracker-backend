import authRoute from '@src/modules/auth/v1/auth.route';
import categoryRoute from '@src/modules/category/v1/category.route';
import userRoute from '@src/modules/user/v1/user.route';
import { Router } from 'express';

const router = Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/categories', categoryRoute);
export default router;
