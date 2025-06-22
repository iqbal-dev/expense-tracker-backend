import authRoute from '@src/modules/auth/v1/auth.route';
import userRoute from '@src/modules/user/v1/user.route';
import { Router } from 'express';
// Add more module routes...

const router = Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);
export default router;
