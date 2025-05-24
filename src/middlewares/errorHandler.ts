/* eslint-disable @typescript-eslint/no-explicit-any */
// src/middlewares/errorHandler.ts
import { ErrorResponse } from '@src/types/response';
import { ApiError } from '@src/utils/ApiError';
import logger from '@src/utils/logger';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: unknown = undefined;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = err.issues;
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  } else if ((err as any).code === 11000) {
    statusCode = 409;
    const field = Object.keys((err as any).keyValue)[0];
    message = `Duplicate field value: '${field}'`;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  logger.error(
    `${req.method} ${req.originalUrl} - ${statusCode} - ${message}`,
    err,
  );

  const errorPayload: ErrorResponse = {
    success: false,
    message,
  };

  if (errors) errorPayload.errors = errors;
  if (process.env.NODE_ENV === 'development') errorPayload.stack = err.stack;

  res.status(statusCode).json(errorPayload);
};
