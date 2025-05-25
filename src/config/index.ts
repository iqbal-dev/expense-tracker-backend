// config.ts (optional)
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || '3000';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
export const MONGODB_URI = process.env.MONGODB_URI as string;
export const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI as string;
