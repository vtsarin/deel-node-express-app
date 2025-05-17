import Profile from '../models/Profile.js';
import { profiles } from './data/profiles.js';
import Seeder from './Seeder.js';
import logger from '../utils/logger.js';

/**
 * Seed the database with initial data
 */
const seed = async () => {
  try {
    const seeder = new Seeder()
      .addModel(Profile, profiles);

    await seeder.seed();
    logger.info('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Failed to seed database:', error);
    process.exit(1);
  }
};

// Run the seed function
seed(); 