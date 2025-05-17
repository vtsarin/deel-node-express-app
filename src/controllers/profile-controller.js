import profileService from '../services/profile-service.js';
import logger from '../utils/logger.js';

/**
 * Controller class for handling profile-related HTTP requests
 * @class ProfileController
 */
class ProfileController {
  /**
   * Retrieves all profiles
   * HTTP Method: GET
   * Route: /profiles
   * 
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  async getProfiles(req, res) {
    try {
      logger.info('GET /profiles - Fetching all profiles');
      const profiles = await profileService.getAllProfiles();
      logger.info(`GET /profiles - Successfully returned ${profiles.length} profiles`);
      res.json(profiles);
    } catch (error) {
      logger.error('GET /profiles - Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieves a specific profile by ID
   * HTTP Method: GET
   * Route: /profiles/:id
   * 
   * @param {import('express').Request} req - Express request object with profile ID in params
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  async getProfile(req, res) {
    try {
      const { id } = req.params;
      logger.info(`GET /profiles/${id} - Fetching profile`);
      const profile = await profileService.getProfileById(id);
      logger.info(`GET /profiles/${id} - Successfully returned profile`);
      res.json(profile);
    } catch (error) {
      logger.error(`GET /profiles/${req.params.id} - Error:`, error);
      if (error.message === 'Profile not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export default new ProfileController(); 