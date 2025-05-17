import express from 'express';
import profileController from '../controllers/profile-controller.js';
import profileAuth from '../middleware/profile-auth.js';

const router = express.Router();

// Apply profile authentication middleware to all routes
router.use(profileAuth);

router.get('/', profileController.getProfiles);
router.get('/:id', profileController.getProfile);

export default router; 