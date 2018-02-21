import * as Sequelize from 'sequelize';
import { sequelize } from './index';

enum SocialLinkType {
  Facebook,
  Instagram,
  Soundcloud,
  Mixcloud,
  Twitter,
  Tumblr,
}

export interface SocialLinkAttributes {
  type: SocialLinkType;
  url: string;
}

export interface SocialLinkInstance
  extends Sequelize.Instance<SocialLinkAttributes> {
  createdAt: Date;
  updatedAt: Date;
}

const SocialLink: Sequelize.Model<
  SocialLinkInstance,
  SocialLinkAttributes
> = sequelize.define('SocialLink', {
  type: Sequelize.ENUM(
    'FACEBOOK',
    'INSTAGRAM',
    'SOUNDCLOUD',
    'MIXCLOUD',
    'TWITTER',
    'TUMBLR'
  ),
  url: Sequelize.STRING,
});

export default SocialLink;
