import express from 'express';

const router = express.Router();

router.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running.' });
});

export default router; 