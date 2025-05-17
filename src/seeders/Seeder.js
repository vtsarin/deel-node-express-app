import sequelize from '../config/database.js';
import logger from '../utils/logger.js';

class Seeder {
  constructor() {
    this.models = [];
  }

  /**
   * Add a model to be seeded
   * @param {Object} model - Sequelize model
   * @param {Array} data - Seed data for the model
   * @returns {Seeder} - Returns this for chaining
   */
  addModel(model, data) {
    this.models.push({ model, data });
    return this;
  }

  /**
   * Seed all registered models
   */
  async seed() {
    try {
      // Force sync to drop and recreate tables
      await sequelize.sync({ force: true });
      logger.info('Database tables recreated');

      // Seed each model
      for (const { model, data } of this.models) {
        await model.bulkCreate(data);
        logger.info(`Seeded ${model.name} with ${data.length} records`);
      }

      logger.info('All seed data inserted successfully');
    } catch (error) {
      logger.error('Error seeding database:', error);
      throw error;
    }
  }
}

export default Seeder; 