import Profile from '../models/Profile.js';
import sequelize from '../config/database.js';
import logger from '../utils/logger.js';

const seedData = [
  {
    id: 1,
    firstName: 'Harry',
    lastName: 'Potter',
    profession: 'Wizard',
    balance: 1150,
    type: 'client'
  },
  {
    id: 2,
    firstName: 'Mr',
    lastName: 'Robot',
    profession: 'Hacker',
    balance: 231.11,
    type: 'client'
  },
  {
    id: 3,
    firstName: 'John',
    lastName: 'Snow',
    profession: 'Knows nothing',
    balance: 451.3,
    type: 'client'
  },
  {
    id: 4,
    firstName: 'Ash',
    lastName: 'Kethcum',
    profession: 'Pokemon master',
    balance: 1.3,
    type: 'client'
  },
  {
    id: 5,
    firstName: 'John',
    lastName: 'Lenon',
    profession: 'Musician',
    balance: 64,
    type: 'contractor'
  },
  {
    id: 6,
    firstName: 'Linus',
    lastName: 'Torvalds',
    profession: 'Programmer',
    balance: 1214,
    type: 'contractor'
  },
  {
    id: 7,
    firstName: 'Alan',
    lastName: 'Turing',
    profession: 'Programmer',
    balance: 22,
    type: 'contractor'
  },
  {
    id: 8,
    firstName: 'Aragorn',
    lastName: 'II Elessar Telcontarvalds',
    profession: 'Fighter',
    balance: 314,
    type: 'contractor'
  }
];

/**
 * Seed the database with initial data
 */
const seed = async () => {
  try {
    // Force sync to drop and recreate tables
    await sequelize.sync({ force: true });
    logger.info('Database tables recreated');

    // Create all profiles
    await Profile.bulkCreate(seedData);
    logger.info('Seed data inserted successfully');

    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seed(); 