import profileService from '../services/profile-service.js';

class ProfileController {
  /**
   * Get all profiles
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async getProfiles(req, res) {
    try {
      const profiles = await profileService.getAllProfiles();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get profile by ID
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async getProfile(req, res) {
    try {
      const profile = await profileService.getProfileById(req.params.id);
      res.json(profile);
    } catch (error) {
      if (error.message === 'Profile not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

// Export a singleton instance
export default new ProfileController(); 