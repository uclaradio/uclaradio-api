import * as Sequelize from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

// Configure connection to database.
const databaseName = 'uclaradio';

const sequelize = new Sequelize(
  databaseName,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false,
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

export { sequelize };
export { default as Show } from './Show';
// export { default as User } from './User';
