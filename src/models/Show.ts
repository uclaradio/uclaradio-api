import * as Sequelize from 'sequelize';
import { sequelize, User } from './index';

enum Day {
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
}

export interface ShowAttributes {
  name: string;
  userIds: number[];
  description?: string;
  genre?: string;
  image?: string;
}

export interface ShowInstance extends Sequelize.Instance<ShowAttributes> {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  description: string;
  genre: string;
  imageURL: string;

  day: Day;
  startTime: string;
  duration: number;
}

const Show: Sequelize.Model<any, any> = sequelize.define('Show', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  genre: Sequelize.STRING,
  imageURL: Sequelize.STRING,
  day: Sequelize.ENUM(
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ),
  startTime: Sequelize.TIME,
  duration: Sequelize.TINYINT,
});

export default Show;
