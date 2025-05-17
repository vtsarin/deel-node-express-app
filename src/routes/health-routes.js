import express from 'express';

const router = express.Router();

/**
 * Health check endpoint
 * @route GET /health
 */
router.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running.' });
});

export default router; 