import * as Sequelize from 'sequelize';

import { sequelize } from './index';
import { SocialSite } from '../types';

export interface SocialLinkAttributes {
  type: SocialSite;
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
    SocialSite.Facebook,
    SocialSite.Instagram,
    SocialSite.Mixcloud,
    SocialSite.Soundcloud,
    SocialSite.Tumblr,
    SocialSite.Twitter
  ),
  url: Sequelize.STRING,
});

export default SocialLink;
