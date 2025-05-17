import { Job, Contract, Profile } from '../models/associations.js';
import logger from '../utils/logger.js';
import { Op } from 'sequelize';
import sequelize from '../models/database.js';

/**
 * Service class for handling job-related business logic and database operations
 * @class JobService
 */
class JobService {
  /**
   * Retrieves all jobs with their related contract data
   * Business Rules:
   * - Returns all jobs regardless of status
   * - Includes related contract information
   * - Used for job listings and overviews
   * 
   * @returns {Promise<Job[]>} Array of jobs with related data
   * @throws {Error} If there's an error fetching jobs
   */
  async getAllJobs() {
    try {
      logger.info('Fetching all jobs with related data');
      const jobs = await Job.findAll({
        include: [{ model: Contract }]
      });
      logger.info(`Successfully fetched ${jobs.length} jobs`);
      return jobs;
    } catch (error) {
      logger.error('Error in getAllJobs:', error);
      throw new Error(`Error fetching jobs: ${error.message}`);
    }
  }

  /**
   * Retrieves all unpaid jobs for active contracts where the user is either client or contractor
   * Business Rules:
   * - Returns only unpaid jobs (paid: false)
   * - Only includes jobs from active contracts (status: 'in_progress')
   * - User must be either the client or contractor of the contract
   * - Includes related contract information
   * 
   * @param {Profile} profile - The authenticated user's profile
   * @returns {Promise<Job[]>} Array of unpaid jobs with related data
   * @throws {Error} If there's an error fetching jobs
   */
  async getUnpaidJobs(profile) {
    try {
      logger.info(`Fetching unpaid jobs for profile ID: ${profile.id}`);

      const jobs = await Job.findAll({
        where: {
          paid: false
        },
        include: [{
          model: Contract,
          where: {
            status: 'in_progress',
            [Op.or]: [
              { ClientId: profile.id },
              { ContractorId: profile.id }
            ]
          },
          required: true
        }]
      });

      logger.info(`Successfully fetched ${jobs.length} unpaid jobs for profile ID: ${profile.id}`);
      return jobs;
    } catch (error) {
      logger.error('Error in getUnpaidJobs:', error);
      throw new Error(`Error fetching unpaid jobs: ${error.message}`);
    }
  }

  /**
   * Process payment for a job
   * Business Rules:
   * - Job must exist and be unpaid
   * - Contract must be active (not terminated)
   * - Client must have sufficient balance
   * - Client must be the authenticated user
   * - Payment amount moves from client to contractor
   * - Job is marked as paid
   * 
   * @param {string|number} jobId - ID of the job to pay for
   * @param {Profile} profile - The authenticated user's profile (must be the client)
   * @returns {Promise<Job>} Updated job with payment information
   * @throws {Error} If payment cannot be processed
   */
  async payForJob(jobId, profile) {
    const transaction = await sequelize.transaction();

    try {
      logger.info(`Processing payment for job ID: ${jobId} by profile ID: ${profile.id}`);

      // Get job with contract and related profiles
      const job = await Job.findOne({
        where: {
          id: jobId,
          paid: false
        },
        include: [{
          model: Contract,
          where: {
            status: {
              [Op.ne]: 'terminated'
            }
          },
          include: [
            { model: Profile, as: 'Client' },
            { model: Profile, as: 'Contractor' }
          ],
          required: true
        }],
        transaction
      });

      if (!job) {
        throw new Error('Job not found or already paid');
      }

      // Verify client is the authenticated user
      if (job.Contract.ClientId !== profile.id) {
        throw new Error('Only the client can pay for this job');
      }

      // Verify client has sufficient balance
      if (profile.balance < job.price) {
        throw new Error('Insufficient balance to pay for this job');
      }

      // Update client balance
      await Profile.update(
        { balance: profile.balance - job.price },
        {
          where: { id: profile.id },
          transaction
        }
      );

      // Update contractor balance
      await Profile.update(
        { balance: job.Contract.Contractor.balance + job.price },
        {
          where: { id: job.Contract.ContractorId },
          transaction
        }
      );

      // Mark job as paid
      const updatedJob = await Job.update(
        {
          paid: true,
          paymentDate: new Date()
        },
        {
          where: { id: jobId },
          transaction,
          returning: true
        }
      );

      await transaction.commit();
      logger.info(`Successfully processed payment for job ID: ${jobId}`);

      return updatedJob;
    } catch (error) {
      await transaction.rollback();
      logger.error(`Error processing payment for job ID ${jobId}:`, error);
      throw new Error(`Payment failed: ${error.message}`);
    }
  }
}

// Export a singleton instance
export default new JobService(); 