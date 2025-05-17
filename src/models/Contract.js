import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Contract extends Model { }

Contract.init(
  {
    terms: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('new', 'in_progress', 'terminated')
    }
  },
  {
    sequelize,
    modelName: 'Contract'
  }
);

export default Contract; 