// src/server.ts

import mongoose from 'mongoose';
import app from './app';
import { MONGODB_URI, PORT } from './config';
import logger from './utils/logger';

async function startServer() {
  logger.info('MONGODB_URI', MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      logger.info(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server', error);
    process.exit(1);
  }
}

startServer();
