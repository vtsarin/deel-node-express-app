import express from 'express';
import contractController from '../controllers/contract-controller.js';
import profileAuth from '../middleware/profile-auth.js';

const router = express.Router();

// Apply profile authentication middleware to all routes
router.use(profileAuth);

router.get('/', contractController.getContracts);
router.get('/:id', contractController.getContractById);

export const contractRouter = router; 