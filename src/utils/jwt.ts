import { jwtExpiresIn, jwtSecret } from '@src/config';
import { CustomJwtPayload } from '@src/types/custom-jwt';
import logger from '@src/utils/logger';
import jwt, { SignOptions } from 'jsonwebtoken';

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

export const verifyToken = (token: string): CustomJwtPayload | null => {
  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (typeof decoded === 'object' && decoded !== null) {
      return decoded as CustomJwtPayload;
    }

    return null;
  } catch (error) {
    logger.warn(error);
    return null;
  }
};
