
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

export default {
  db_dev: process.env.DB_DEV_URI,
  db_test: process.env.DB_TEST_URI,
  db_prod: process.env.DB_PROD_URI,
  jwt_secret: process.env.JWT_SECRET,
  port: {
    development: process.env.DEV_PORT,
    test: process.env.TEST_PORT,
    production: process.env.PORT
  }
};
