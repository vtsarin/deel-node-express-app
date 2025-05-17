import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Profile extends Model { }

const ProfileModel = {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(12, 2)
  },
  type: {
    type: DataTypes.ENUM('client', 'contractor')
  }
};

Profile.init(
  ProfileModel,
  {
    sequelize,
    modelName: 'Profile'
  }
);

export default Profile; 