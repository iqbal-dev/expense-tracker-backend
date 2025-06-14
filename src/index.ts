import { Request, Response } from 'express';
import mongoose from 'mongoose';
import app from './app';
import { MONGODB_URI } from './config';
let isConnected = false;

// Vercel's handler — this must be the default export
export default async function handler(req: Request, res: Response) {
  if (!isConnected) {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
  }

  // Express app is used as a request handler function
  return app(req, res);
}
