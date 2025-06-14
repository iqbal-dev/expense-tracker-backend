// src/api.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import app from './app';
import { MONGODB_URI } from './config';
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(MONGODB_URI);
  isConnected = true;
}

export default async function handler(req: Request, res: Response) {
  await connectDB();
  return app(req, res); // Forward to Express app
}
