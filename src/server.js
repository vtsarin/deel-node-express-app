// server.js
import { PORT } from './constant/env.js';
import logger from './utils/logger.js';
import { setupProcessHandlers } from './utils/process-handlers.js';
import sequelize from './config/database.js';
import { createApplication } from './application.js';

/**
 * Initialize and start the server
 */
const startServer = async () => {
  try {
    // Initialize database
    await sequelize.sync();
    logger.info('Database synchronized successfully');

    // Create Express application
    const app = createApplication();

    // Start server
    const server = app.listen(PORT, () => {
      logger.info(`Deel Node-Express Server running at http://localhost:${PORT}`);
    });

    // Setup process handlers
    setupProcessHandlers(server);
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

