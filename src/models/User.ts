import * as Sequelize from 'sequelize';
import { sequelize } from './index';

export interface UserAttributes {}

export interface UserInstance {}

const User: Sequelize.Model<UserInstance, UserAttributes> = sequelize.define(
  'User',
  {
    bio: Sequelize.STRING,
    djName: Sequelize.STRING,
    email: Sequelize.STRING,
    fullName: Sequelize.STRING,
    password: Sequelize.STRING,
    phone: Sequelize.STRING,
    picture: Sequelize.STRING,
    shows: Sequelize.ARRAY(Sequelize.TEXT)
  }
);

sequelize.sync();

export default User;
