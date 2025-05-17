import contractService from '../services/contract-service.js';
import logger from '../utils/logger.js';

/**
 * Controller class for handling contract-related HTTP requests
 * @class ContractController
 */
class ContractController {
  /**
   * Retrieves all non-terminated contracts for the authenticated user
   * HTTP Method: GET
   * Route: /contracts
   * 
   * @param {import('express').Request} req - Express request object with authenticated profile
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  async getContracts(req, res) {
    try {
      logger.info(`GET /contracts - Fetching contracts for profile ID: ${req.profile.id}`);
      const contracts = await contractService.getAllContracts(req.profile);
      logger.info(`GET /contracts - Successfully returned ${contracts.length} contracts for profile ID: ${req.profile.id}`);
      res.json(contracts);
    } catch (error) {
      logger.error('GET /contracts - Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieves a specific contract by ID for the authenticated user
   * HTTP Method: GET
   * Route: /contracts/:id
   * 
   * @param {import('express').Request} req - Express request object with authenticated profile and contract ID in params
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  async getContractById(req, res) {
    try {
      const { id } = req.params;
      logger.info(`GET /contracts/${id} - Fetching contract for profile ID: ${req.profile.id}`);
      const contract = await contractService.getContractById(id, req.profile);
      logger.info(`GET /contracts/${id} - Successfully returned contract for profile ID: ${req.profile.id}`);
      res.json(contract);
    } catch (error) {
      logger.error(`GET /contracts/${req.params.id} - Error:`, error);
      if (error.message === 'Contract not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export default new ContractController(); 