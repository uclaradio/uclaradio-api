import * as Sequelize from 'sequelize';
import { sequelize, Show } from './index';

export interface UserAttributes {}

export interface UserInstance {}

const User: Sequelize.Model<any, any> = sequelize.define('User', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  fullName: Sequelize.STRING,
  phone: Sequelize.STRING,
  picture: Sequelize.STRING,

  isDJ: Sequelize.BOOLEAN,
  djName: Sequelize.STRING,
  bio: Sequelize.STRING,

  isManager: Sequelize.BOOLEAN,
  isAdmin: Sequelize.BOOLEAN,
});

//

export default User;
