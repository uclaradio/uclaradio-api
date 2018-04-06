import * as Sequelize from 'sequelize';
import { sequelize, Show } from './index';
import { ShowInstance } from './Show';

export interface UserAttributes {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  picture?: string;

  isDJ: boolean;
  djName?: string;
  bio?: string;

  isManager: boolean;
  isAdmin: boolean;
}

export interface UserInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  addShow(s: ShowInstance): void;
}

const User: Sequelize.Model<UserInstance, UserAttributes> = sequelize.define(
  'User',
  {
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
  }
);

export default User;
