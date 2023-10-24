const config = {
  development: {
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
  },

  test: {
    username: 'postgres',
    password: '12345',
    database: 'test',
    host: 'localhost',
  },
  production: {
    username: 'your_prod_db_username',
    password: 'your_prod_db_password',
    database: 'your_prod_db_name',
    host: 'your_prod_db_host',
  },
};
export default config;
module.exports = config;
