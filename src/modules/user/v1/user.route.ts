import { authMiddleware } from '@src/middlewares/auth';
import validateRequest from '@src/middlewares/validateRequest';
import {
  updateUserPasswordValidationSchema,
  updateUserValidationSchema,
} from '@src/modules/user/v1/user.validation';
import { Router } from 'express';
import * as userController from './user.controller';

const router = Router();

router.get('/me', authMiddleware, userController.getUserProfile);
router.patch(
  '/profile',
  authMiddleware,
  validateRequest(updateUserValidationSchema),
  userController.updateUserProfile,
);
router.patch(
  '/change-password',
  authMiddleware,
  validateRequest(updateUserPasswordValidationSchema),
  userController.updateUserPassword,
);

export default router;
