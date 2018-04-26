import * as Sequelize from 'sequelize';

import { Day, Hour } from '../types';
import { sequelize, User } from './index';
import { SocialLinkInstance } from './SocialLink';
import { UserInstance } from './User';

export interface ShowAttributes {
  title?: string;
  description?: string;
  genre?: string;
  imageURL?: string;
  day?: Day;
  startTime?: Hour;
  duration?: number;
}

export interface ShowInstance extends Sequelize.Instance<ShowAttributes> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  addSocialLink(s: SocialLinkInstance): void;
  addUser(u: UserInstance): void;
}

const Show: Sequelize.Model<ShowInstance, ShowAttributes> = sequelize.define(
  'Show',
  {
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
    startTime: Sequelize.INTEGER,
    duration: Sequelize.INTEGER,
  }
);

export default Show;
