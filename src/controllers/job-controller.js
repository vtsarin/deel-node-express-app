import jobService from '../services/job-service.js';
import logger from '../utils/logger.js';

/**
 * Controller class for handling job-related HTTP requests
 * @class JobController
 */
class JobController {
  /**
   * Retrieves all unpaid jobs for active contracts where the user is either client or contractor
   * HTTP Method: GET
   * Route: /jobs/unpaid
   * 
   * @param {import('express').Request} req - Express request object with authenticated profile
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  async getUnpaidJobs(req, res) {
    try {
      logger.info(`GET /jobs/unpaid - Fetching unpaid jobs for profile ID: ${req.profile.id}`);
      const jobs = await jobService.getUnpaidJobs(req.profile);
      logger.info(`GET /jobs/unpaid - Successfully returned ${jobs.length} unpaid jobs for profile ID: ${req.profile.id}`);
      res.json(jobs);
    } catch (error) {
      logger.error('GET /jobs/unpaid - Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Process payment for a job
   * HTTP Method: POST
   * Route: /jobs/:job_id/pay
   * 
   * @param {import('express').Request} req - Express request object with authenticated profile and job ID in params
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  async payForJob(req, res) {
    try {
      const { job_id } = req.params;
      logger.info(`POST /jobs/${job_id}/pay - Processing payment by profile ID: ${req.profile.id}`);

      const updatedJob = await jobService.payForJob(job_id, req.profile);

      logger.info(`POST /jobs/${job_id}/pay - Successfully processed payment by profile ID: ${req.profile.id}`);
      res.json(updatedJob);
    } catch (error) {
      logger.error(`POST /jobs/${req.params.job_id}/pay - Error:`, error);

      if (error.message.includes('not found') ||
        error.message.includes('already paid') ||
        error.message.includes('Only the client') ||
        error.message.includes('Insufficient balance')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export default new JobController(); 