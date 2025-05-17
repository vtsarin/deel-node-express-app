import express from 'express';
import jobController from '../controllers/job-controller.js';

const router = express.Router();

router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);

export const jobRouter = router; 