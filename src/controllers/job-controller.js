import jobService from '../services/job-service.js';

class JobController {
  /**
   * Get all jobs
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async getJobs(req, res) {
    try {
      const jobs = await jobService.getAllJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get job by ID
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async getJobById(req, res) {
    try {
      const job = await jobService.getJobById(req.params.id);
      res.json(job);
    } catch (error) {
      if (error.message === 'Job not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  /**
   * Create a new job
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async createJob(req, res) {
    try {
      const job = await jobService.createJob(req.body);
      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update an existing job
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async updateJob(req, res) {
    try {
      const job = await jobService.updateJob(req.params.id, req.body);
      res.json(job);
    } catch (error) {
      if (error.message === 'Job not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export default new JobController(); 