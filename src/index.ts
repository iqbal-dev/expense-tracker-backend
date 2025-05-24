import { PORT } from '@src/config';
import { attachRequestId } from '@src/middlewares/requestId';
import express from 'express';
import httpLogger from './utils/httpLogger';
import logger from './utils/logger';
// or just import dotenv and call dotenv.config() directly in this file

const app = express();

app.use(attachRequestId);
app.use(httpLogger);

app.get('/', (_, res) => {
  res.send('Welcome to the Expense Tracker API!');
});

app.listen(PORT, () => {
  logger.info(`Server running on port: ${PORT}`);
});

export default app;
