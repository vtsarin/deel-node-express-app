import express from 'express';
import jobController from '../controllers/job-controller.js';
import profileAuth from '../middleware/profile-auth.js';

const router = express.Router();

// Apply profile authentication middleware to all routes
router.use(profileAuth);

router.get('/unpaid', jobController.getUnpaidJobs);
router.post('/:job_id/pay', jobController.payForJob);

export default router; 