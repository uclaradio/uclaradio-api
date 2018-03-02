import * as Sequelize from 'sequelize';
import { sequelize } from './index';

export interface PageLinkAttributes {
  name: string;
  description?: string;
  linkUrl?: string;
  imageUrl?: string;
}

export interface PageLinkInterface {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

const PageLink: Sequelize.Model<
  PageLinkInterface,
  PageLinkAttributes
> = sequelize.define('PageLink', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  linkUrl: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
});

export default PageLink;
