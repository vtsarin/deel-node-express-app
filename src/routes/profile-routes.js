import express from 'express';
import profileController from '../controllers/profile-controller.js';

const router = express.Router();

router.get('/', profileController.getProfiles);
router.get('/:id', profileController.getProfile);

export default router; 