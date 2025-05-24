// src/utils/sendResponse.ts
import { GenericResponse } from '@src/types/response';
import { Response } from 'express';

export function sendSuccess<T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200,
) {
  const payload: GenericResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(payload);
}
