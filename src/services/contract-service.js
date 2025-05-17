import { Contract, Profile, Job } from '../models/associations.js';
import logger from '../utils/logger.js';
import { Op } from 'sequelize';

/**
 * Service class for handling contract-related business logic and database operations
 * @class ContractService
 */
class ContractService {
  /**
   * Retrieves all non-terminated contracts for the authenticated user
   * Business Rules:
   * - Returns only non-terminated contracts
   * - Returns contracts where user is either Client or Contractor
   * - Includes related Contractor and Client profiles
   * - Includes all associated jobs
   * 
   * @param {Profile} profile - The authenticated user's profile
   * @returns {Promise<Contract[]>} Array of contracts with related data
   * @throws {Error} If there's an error fetching contracts
   */
  async getAllContracts(profile) {
    try {
      logger.info(`Fetching non-terminated contracts for profile ID: ${profile.id}`);

      const contracts = await Contract.findAll({
        where: {
          status: {
            [Op.ne]: 'terminated'
          },
          [Op.or]: [
            { ClientId: profile.id },
            { ContractorId: profile.id }
          ]
        },
        include: [
          { model: Profile, as: 'Contractor' },
          { model: Profile, as: 'Client' },
          { model: Job }
        ]
      });

      logger.info(`Successfully fetched ${contracts.length} contracts for profile ID: ${profile.id}`);
      return contracts;
    } catch (error) {
      logger.error('Error in getAllContracts:', error);
      throw new Error(`Error fetching contracts: ${error.message}`);
    }
  }

  /**
   * Retrieves a specific contract by ID with all related data
   * Business Rules:
   * - Contract must exist
   * - Contract must belong to the authenticated user (as Client or Contractor)
   * - Returns full contract details including relationships
   * - Used for detailed contract views
   * 
   * @param {string|number} id - Contract ID
   * @param {Profile} profile - The authenticated user's profile
   * @returns {Promise<Contract>} Contract object with related data
   * @throws {Error} If contract not found or error occurs
   */
  async getContractById(id, profile) {
    try {
      logger.info(`Fetching contract with ID: ${id} for profile ID: ${profile.id}`);

      const contract = await Contract.findOne({
        where: {
          id,
          [Op.or]: [
            { ClientId: profile.id },
            { ContractorId: profile.id }
          ]
        },
        include: [
          { model: Profile, as: 'Contractor' },
          { model: Profile, as: 'Client' },
          { model: Job }
        ]
      });

      if (!contract) {
        logger.warn(`Contract not found or not accessible for profile ID: ${profile.id}`);
        throw new Error('Contract not found');
      }

      logger.info(`Successfully fetched contract with ID: ${id} for profile ID: ${profile.id}`);
      return contract;
    } catch (error) {
      logger.error(`Error in getContractById for ID ${id}:`, error);
      throw new Error(`Error fetching contract: ${error.message}`);
    }
  }
}

// Export a singleton instance
export default new ContractService(); 