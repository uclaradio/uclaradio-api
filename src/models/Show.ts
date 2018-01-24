import * as Sequelize from 'sequelize';
import { sequelize } from './index';

export interface ShowAttributes {}

export interface ShowInstance {}

const Show: Sequelize.Model<ShowInstance, ShowAttributes> = sequelize.define(
  'Show',
  {}
);

sequelize.sync();

export default Show;
