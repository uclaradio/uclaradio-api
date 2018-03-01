import * as Sequelize from 'sequelize';
import { sequelize } from './index';

export interface SocialLinkAttributes {
  show_id: number;
  url: string;
  // social: enum;
}

export interface SocialLinkInstance
  extends Sequelize.Instance<SocialLinkAttributes> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLink: Sequelize.Model<
  SocialLinkInstance,
  SocialLinkAttributes
> = sequelize.define('SocialLink', {
  show_id: Sequelize.INTEGER,
  url: Sequelize.STRING,
  // social: Sequelize.ENUM(
  //   'FACEBOOK',
  //   'INSTAGRAM',
  //   'SOUNDCLOUD',
  //   'MIXCLOUD',
  //   'TWITTER',
  //   'TUMBLR'
  // ),
});

sequelize.sync();

export default SocialLink;
