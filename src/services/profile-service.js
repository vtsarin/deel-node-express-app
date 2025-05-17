import Profile from '../models/Profile.js';

class ProfileService {
  /**
   * Get all profiles
   * @returns {Promise<Profile[]>} Array of profiles
   */
  async getAllProfiles() {
    try {
      return await Profile.findAll();
    } catch (error) {
      throw new Error(`Error fetching profiles: ${error.message}`);
    }
  }

  /**
   * Get profile by ID
   * @param {string|number} id - Profile ID
   * @returns {Promise<Profile>} Profile object
   */
  async getProfileById(id) {
    try {
      const profile = await Profile.findByPk(id);
      if (!profile) {
        throw new Error('Profile not found');
      }
      return profile;
    } catch (error) {
      throw new Error(`Error fetching profile: ${error.message}`);
    }
  }
}

// Export a singleton instance
export default new ProfileService(); 