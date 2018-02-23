import * as Sequelize from 'sequelize';
import { sequelize } from './index';

export interface PageLinkAttributes {
  showId: number;
  name: string;
  description?: string;
  url?: string;
  image?: string;
}

export interface PageLinkInterface {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

const User: Sequelize.Model<
  PageLinkInterface,
  PageLinkAttributes
> = sequelize.define('PageLink', {
  showId: Sequelize.INTEGER,
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  url: Sequelize.STRING,
  image: Sequelize.STRING,
});

sequelize.sync();

export default PageLink;
