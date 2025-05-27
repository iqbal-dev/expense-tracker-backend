import userRoute from '@src/modules/user/v1/user.route';
import { Router } from 'express';
// Add more module routes...

const router = Router();

router.use('/users', userRoute);

export default router;
