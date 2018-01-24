import * as Sequelize from 'sequelize';
import { sequelize } from './index';

export interface UserAttributes {}

export interface UserInstance {}

const User: Sequelize.Model<UserInstance, UserAttributes> = sequelize.define(
  'User',
  {}
);

sequelize.sync();

export default User;
