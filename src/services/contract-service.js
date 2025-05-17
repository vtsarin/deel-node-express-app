import { Contract, Profile, Job } from '../models/associations.js';

class ContractService {
  /**
   * Get all contracts with their related data
   * @returns {Promise<Contract[]>} Array of contracts
   */
  async getAllContracts() {
    try {
      return await Contract.findAll({
        include: [
          { model: Profile, as: 'Contractor' },
          { model: Profile, as: 'Client' },
          { model: Job }
        ]
      });
    } catch (error) {
      throw new Error(`Error fetching contracts: ${error.message}`);
    }
  }

  /**
   * Get contract by ID with related data
   * @param {string|number} id - Contract ID
   * @returns {Promise<Contract>} Contract object
   */
  async getContractById(id) {
    try {
      const contract = await Contract.findOne({
        where: { id },
        include: [
          { model: Profile, as: 'Contractor' },
          { model: Profile, as: 'Client' },
          { model: Job }
        ]
      });
      if (!contract) {
        throw new Error('Contract not found');
      }
      return contract;
    } catch (error) {
      throw new Error(`Error fetching contract: ${error.message}`);
    }
  }

  /**
   * Create a new contract
   * @param {Object} contractData - Contract data
   * @returns {Promise<Contract>} Created contract
   */
  async createContract(contractData) {
    try {
      return await Contract.create(contractData);
    } catch (error) {
      throw new Error(`Error creating contract: ${error.message}`);
    }
  }

  /**
   * Update an existing contract
   * @param {string|number} id - Contract ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Contract>} Updated contract
   */
  async updateContract(id, updateData) {
    try {
      const contract = await Contract.findByPk(id);
      if (!contract) {
        throw new Error('Contract not found');
      }
      return await contract.update(updateData);
    } catch (error) {
      throw new Error(`Error updating contract: ${error.message}`);
    }
  }
}

// Export a singleton instance
export default new ContractService(); 