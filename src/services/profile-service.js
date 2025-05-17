import Profile from '../models/Profile.js';
import logger from '../utils/logger.js';

/**
 * Service class for handling profile-related business logic and database operations
 * @class ProfileService
 */
class ProfileService {
  /**
   * Retrieves all profiles
   * Business Rules:
   * - Returns all profiles regardless of type (client/contractor)
   * - Used for profile listings and overviews
   * 
   * @returns {Promise<Profile[]>} Array of profiles
   * @throws {Error} If there's an error fetching profiles
   */
  async getAllProfiles() {
    try {
      logger.info('Fetching all profiles');
      const profiles = await Profile.findAll();
      logger.info(`Successfully fetched ${profiles.length} profiles`);
      return profiles;
    } catch (error) {
      logger.error('Error in getAllProfiles:', error);
      throw new Error(`Error fetching profiles: ${error.message}`);
    }
  }

  /**
   * Retrieves a specific profile by ID
   * Business Rules:
   * - Profile must exist
   * - Returns full profile details
   * - Used for detailed profile views
   * 
   * @param {string|number} id - Profile ID
   * @returns {Promise<Profile>} Profile object
   * @throws {Error} If profile not found or error occurs
   */
  async getProfileById(id) {
    try {
      logger.info(`Fetching profile with ID: ${id}`);
      const profile = await Profile.findByPk(id);
      if (!profile) {
        logger.warn(`Profile not found with ID: ${id}`);
        throw new Error('Profile not found');
      }
      logger.info(`Successfully fetched profile with ID: ${id}`);
      return profile;
    } catch (error) {
      logger.error(`Error in getProfileById for ID ${id}:`, error);
      throw new Error(`Error fetching profile: ${error.message}`);
    }
  }
}

// Export a singleton instance
export default new ProfileService(); 