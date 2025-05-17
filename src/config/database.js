import { Sequelize } from 'sequelize';
import { ENV } from '../constant/env.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  logging: ENV === 'development'
});

export default sequelize;
