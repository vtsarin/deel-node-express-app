import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
};

export const notFoundHandler = (req, res, next) => {
  logger.warn(`404 - Not Found - ${req.originalUrl}`);
  res.status(404).json({ error: 'Not found' });
}; 