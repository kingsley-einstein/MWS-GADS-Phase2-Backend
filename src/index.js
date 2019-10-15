import express from 'express';
import db from './db';
import configure from './config';
import env from './env';
import {ping} from './helpers';

const {sequelize} = db;
const app = express();
const sequelizeOpts = {
  development: {
    force: false
  },
  test: {
    force: true
  },
  production: {
    force: false
  }
};
const port = env.port[process.env.NODE_ENV] || 5230;

configure(app, express);

sequelize.sync(sequelizeOpts[process.env.NODE_ENV]).then(() => {
  app.listen(port, () => {
    if (process.env.NODE_ENV === 'production') {
      ping();
    }
    console.log(`Server listening on port ${port}`);
  });
});
