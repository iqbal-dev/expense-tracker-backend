// src/app.ts
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFound';
import { attachRequestId } from './middlewares/requestId';
import httpLogger from './utils/httpLogger';

const app: Application = express();

// Security & CORS
app.use(cors());
app.use(helmet());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request ID middleware (optional)
app.use(attachRequestId);

// HTTP logger
app.use(httpLogger);

// Routes
// app.use('/api/users', userRoutes);

// Not found route handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;
