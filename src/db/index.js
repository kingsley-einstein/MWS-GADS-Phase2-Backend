import {Sequelize, DataTypes} from 'sequelize';
import configurer from './config';
import definitions from './models';

const conf = configurer[process.env.NODE_ENV];

const sequelize = new Sequelize(conf.url, conf.config);

const {UserDefinition, FavoriteDefinition, BlacklistDefinition} = definitions;

const db = {
  models: {
    User: UserDefinition(sequelize, DataTypes),
    Favorite: FavoriteDefinition(sequelize, DataTypes),
    Blacklist: BlacklistDefinition(sequelize, DataTypes)
  },
  sequelize
};

Object.keys(db.models).forEach((model) => {
  if (db.models[model].associate) {
    db.models[model].associate(db.models);
  }
});

export default db;
