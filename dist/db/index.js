"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _config = _interopRequireDefault(require("./config"));

var _models = _interopRequireDefault(require("./models"));

var conf = _config["default"][process.env.NODE_ENV];
var sequelize = new _sequelize.Sequelize(conf.url, conf.config);
var UserDefinition = _models["default"].UserDefinition,
    FavoriteDefinition = _models["default"].FavoriteDefinition,
    BlacklistDefinition = _models["default"].BlacklistDefinition;
var db = {
  models: {
    User: UserDefinition(sequelize, _sequelize.DataTypes),
    Favorite: FavoriteDefinition(sequelize, _sequelize.DataTypes),
    Blacklist: BlacklistDefinition(sequelize, _sequelize.DataTypes)
  },
  sequelize: sequelize
};
Object.keys(db.models).forEach(function (model) {
  if (db.models[model].associate) {
    db.models[model].associate(db.models);
  }
});
var _default = db;
exports["default"] = _default;