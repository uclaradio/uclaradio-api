import * as Sequelize from 'sequelize';
import { sequelize } from './index';

// export interface ShowAttributes {}

// export interface ShowInstance extends Sequelize.Instance<ShowAttributes> {
//   id: number;
//   name: string;
// }

const Show: Sequelize.Model<any, any> = sequelize.define(
  'Show',
  {
      name: Sequelize.STRING,
      userIds: Sequelize.ARRAY(Sequelize.INTEGER),
      description: Sequelize.STRING,
      genre: Sequelize.STRING,
      image: Sequelize.STRING,
      startTime: Sequelize.TIME,
      endTime: Sequelize.TIME
  }
);

sequelize.sync();

export default Show;
