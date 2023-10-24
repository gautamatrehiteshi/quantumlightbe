import { Sequelize } from 'sequelize';
import config from './config';

const environment =
  (process.env.NODE_ENV as 'production' | 'test' | 'development') ||
  'development';
const dbCred = config[environment];

export const sequelize = new Sequelize(
  dbCred.database,
  dbCred.username,
  dbCred.password,
  {
    host: dbCred.host,
    dialect: 'postgres',
  }
);

(async function () {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
