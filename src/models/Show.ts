import * as Sequelize from 'sequelize';
import { sequelize, User } from './index';

enum Day {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
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
    Day.Monday,
    Day.Tuesday,
    Day.Wednesday,
    Day.Thursday,
    Day.Friday,
    Day.Saturday,
    Day.Sunday
  ),
  startTime: Sequelize.TIME,
  duration: Sequelize.INTEGER,
});

export default Show;
