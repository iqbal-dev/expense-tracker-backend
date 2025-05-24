import { NextFunction, Request, Response } from 'express';

export const attachRequestId = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req as any).id = crypto.randomUUID();
  next();
};
