import { Job, Contract } from '../models/associations.js';

class JobService {
  /**
   * Get all jobs with their related data
   * @returns {Promise<Job[]>} Array of jobs
   */
  async getAllJobs() {
    try {
      return await Job.findAll({
        include: [{ model: Contract }]
      });
    } catch (error) {
      throw new Error(`Error fetching jobs: ${error.message}`);
    }
  }

  /**
   * Get job by ID with related data
   * @param {string|number} id - Job ID
   * @returns {Promise<Job>} Job object
   */
  async getJobById(id) {
    try {
      const job = await Job.findOne({
        where: { id },
        include: [{ model: Contract }]
      });
      if (!job) {
        throw new Error('Job not found');
      }
      return job;
    } catch (error) {
      throw new Error(`Error fetching job: ${error.message}`);
    }
  }

  /**
   * Create a new job
   * @param {Object} jobData - Job data
   * @returns {Promise<Job>} Created job
   */
  async createJob(jobData) {
    try {
      return await Job.create(jobData);
    } catch (error) {
      throw new Error(`Error creating job: ${error.message}`);
    }
  }

  /**
   * Update an existing job
   * @param {string|number} id - Job ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Job>} Updated job
   */
  async updateJob(id, updateData) {
    try {
      const job = await Job.findByPk(id);
      if (!job) {
        throw new Error('Job not found');
      }
      return await job.update(updateData);
    } catch (error) {
      throw new Error(`Error updating job: ${error.message}`);
    }
  }
}

// Export a singleton instance
export default new JobService(); 