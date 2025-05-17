import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import correlationId from './middleware/correlation-id.js';
import requestLogger from './middleware/request-logger.js';
import { errorHandler, notFoundHandler } from './middleware/index.js';
import routeManager from './routes/route-manager.js';

/**
 * Create and configure Express application
 * @returns {import('express').Application} Configured Express application
 */
export const createApplication = () => {
  const app = express();

  // Security and parsing middleware
  app.use(helmet()); // Basic security headers
  app.use(cors()); // Enable CORS
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Custom Application middlewares
  app.use(correlationId);
  app.use(requestLogger);

  // Register all routes
  routeManager.registerRoutes(app);

  // Error handling middleware
  app.use(notFoundHandler); // 404 handler
  app.use(errorHandler); // Error handler

  return app;
}; 