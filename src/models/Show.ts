import * as Sequelize from 'sequelize';
import { sequelize } from './index';

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
}

const Show: Sequelize.Model<ShowInstance, ShowAttributes> = sequelize.define(
  'Show',
  {
    name: Sequelize.STRING,
    userIds: Sequelize.ARRAY(Sequelize.INTEGER),
    description: Sequelize.STRING,
    genre: Sequelize.STRING,
    image: Sequelize.STRING,
    startTime: Sequelize.TIME,
    endTime: Sequelize.TIME,
  }
);

sequelize.sync();

export default Show;
