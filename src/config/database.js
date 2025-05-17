import { Sequelize } from 'sequelize';
import { ENV } from '../constant/env.js';
import logger from '../utils/logger.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  logging: ENV === 'development' ? (msg) => logger.debug(msg) : false
});

export default sequelize;
