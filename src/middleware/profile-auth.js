import Profile from '../models/Profile.js';
import logger from '../utils/logger.js';

/**
 * Middleware to authenticate requests using profile_id from headers
 * Business Rules:
 * - profile_id is required in request headers
 * - profile_id must reference a valid profile in the database
 * - Attaches the profile object to the request for use in route handlers
 */
const profileAuth = async (req, res, next) => {
  try {
    const profileId = req.headers['profile_id'];

    // Check if profile_id is present
    if (!profileId) {
      logger.warn('Request missing required profile_id header');
      return res.status(401).json({ error: 'profile_id is required in headers' });
    }

    logger.info(`Authenticating request with profile_id: ${profileId}`);

    // Fetch profile from database
    const profile = await Profile.findByPk(profileId);

    // Check if profile exists
    if (!profile) {
      logger.warn(`Profile not found for profile_id: ${profileId}`);
      return res.status(401).json({ error: 'Invalid profile_id' });
    }

    // Attach profile to request object for use in route handlers
    req.profile = profile;
    logger.info(`Successfully authenticated profile: ${profileId}`);

    next();
  } catch (error) {
    logger.error('Error in profile authentication:', error);
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
};

export default profileAuth; 