import { sendSuccess } from '@src/utils/sendResponse';
import { Router } from 'express';
// Add more module routes...

const router = Router();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.use('/', (_req, res, _next) => {
  sendSuccess(res, 'Api version connected');
});

export default router;
