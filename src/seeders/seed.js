import { Profile, Contract, Job } from '../models/associations.js';
import { profiles } from './data/profiles.js';
import { contracts } from './data/contracts.js';
import { jobs } from './data/jobs.js';
import Seeder from './Seeder.js';
import logger from '../utils/logger.js';

/**
 * Seed the database with initial data
 */
const seed = async () => {
  try {
    const seeder = new Seeder()
      .addModel(Profile, profiles)
      .addModel(Contract, contracts)
      .addModel(Job, jobs);

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