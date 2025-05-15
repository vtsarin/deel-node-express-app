import logger from './logger.js';

export const setupProcessHandlers = (server) => {
  process.on('SIGTERM', () => shutdown(server));
  process.on('SIGINT', () => shutdown(server));

  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1); // optional
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason);
  });
};

function shutdown(server) {
  logger.info('\n Shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed. Cleanup complete.');
    process.exit(0);
  });
} 