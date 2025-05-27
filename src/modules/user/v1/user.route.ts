import validateRequest from '@src/middlewares/validateRequest';
import { Router } from 'express';
import { createUser } from './user.controller';
import { createUserValidationSchema } from './user.validation';

const router = Router();

router.post('/', validateRequest(createUserValidationSchema), createUser);

export default router;
