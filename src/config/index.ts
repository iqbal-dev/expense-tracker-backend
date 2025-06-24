import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || '3000';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
export const MONGODB_URI = process.env.MONGODB_URI as string;
export const MONGODB_TEST_URI = process.env.MONGODB_TEST_URI as string;
export const hashingSalt = process.env.HASHING_SALT as string;
export const jwtAccessTokenSecret = process.env
  .JWT_ACCESS_TOKEN_SECRET as string;
export const jwtRefreshTokenSecret = process.env
  .JWT_REFRESH_TOKEN_SECRET as string;
export const jwtAccessTokenExpiry =
  process.env.JWT_ACCESS_TOKEN_EXPIRY || '15m';
export const jwtRefreshTokenExpiry =
  process.env.JWT_REFRESH_TOKEN_EXPIRY || '7d';
