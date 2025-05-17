import contractService from '../services/contract-service.js';

class ContractController {
  /**
   * Get all contracts
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async getContracts(req, res) {
    try {
      const contracts = await contractService.getAllContracts();
      res.json(contracts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get contract by ID
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async getContractById(req, res) {
    try {
      const contract = await contractService.getContractById(req.params.id);
      res.json(contract);
    } catch (error) {
      if (error.message === 'Contract not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  /**
   * Create a new contract
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async createContract(req, res) {
    try {
      const contract = await contractService.createContract(req.body);
      res.status(201).json(contract);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update an existing contract
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async updateContract(req, res) {
    try {
      const contract = await contractService.updateContract(req.params.id, req.body);
      res.json(contract);
    } catch (error) {
      if (error.message === 'Contract not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export default new ContractController(); 