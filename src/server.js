// server.js
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { PORT } from './constant/env.js'
import correlationId from './middleware/correlation-id.js';
import requestLogger from './middleware/request-logger.js';
import logger from './utils/logger.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/index.js';
import { setupProcessHandlers } from './utils/process-handlers.js';

const app = express();

// Security and parsing middleware
app.use(helmet()); // Basic security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Custom Application middlewares
app.use(correlationId);
app.use(requestLogger);

// Routes
app.use(routes);

// Error handling middleware
app.use(notFoundHandler); // 404 handler
app.use(errorHandler); // Error handler

// Start server and setup process handlers
const server = app.listen(PORT, () => {
  logger.info(`Deel Node-Express Server running at http://localhost:${PORT}`);
});

setupProcessHandlers(server);

