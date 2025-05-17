import express from 'express';
import contractController from '../controllers/contract-controller.js';

const router = express.Router();

router.get('/', contractController.getContracts);
router.get('/:id', contractController.getContractById);
router.post('/', contractController.createContract);
router.put('/:id', contractController.updateContract);

export const contractRouter = router; 