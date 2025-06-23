import { authMiddleware } from '@src/middlewares/auth';
import { Router } from 'express';
import * as userController from './user.controller';

const router = Router();

router.post('/me', authMiddleware, userController.getUserProfile);

export default router;
