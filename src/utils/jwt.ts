import { jwtExpiresIn, jwtSecret } from '@src/config';
import logger from '@src/utils/logger';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

// Interface for the payload
type TokenPayload = {
  userId: string;
  role?: string;
};

// Generate JWT token
export const generateToken = (
  payload: TokenPayload,
  options: SignOptions = {
    expiresIn: jwtExpiresIn as SignOptions['expiresIn'],
  },
): string => {
  return jwt.sign(payload, jwtSecret, options);
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (typeof decoded === 'object' && decoded !== null) {
      return decoded as JwtPayload;
    }

    return null;
  } catch (error) {
    logger.warn(error);
    return null;
  }
};
