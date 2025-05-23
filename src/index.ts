import express from 'express';
import { PORT } from './config';
import { attachRequestId } from './middlewares/requestId';
import httpLogger from './utils/httpLogger';
import logger from './utils/logger';

const app = express();

// Middleware to attach unique request ID for tracking
app.use(attachRequestId);

// Middleware to log HTTP requests
app.use(httpLogger);

// Basic route
app.get('/health', (_, res) => {
  res.send('Welcome to the Expense Tracker API!');
});

// Start server listening on specified port
app.listen(PORT || 3000, () => {
  logger.info(`Server is running on port: ${PORT}`);
});

export default app;
