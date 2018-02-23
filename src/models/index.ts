import * as Sequelize from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

// Configure connection to database.
const databaseName =
  process.env.NODE_ENV === 'test' ? 'uclaradio-test' : 'uclaradio';

const sequelize = new Sequelize(
  databaseName,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    // logging: false,
    operatorsAliases: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

import Show from './Show';
import User from './User';
import SocialLink from './SocialLink';
import PromoBanner from './PromoBanner';
import PageLink from './PageLink';

Show.belongsToMany(User, { through: 'UserShow' });
User.belongsToMany(Show, { through: 'UserShow' });
Show.hasMany(SocialLink);

export { sequelize, Show, User, SocialLink, PromoBanner, PageLink };
