"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Blacklist = sequelize.define('Blacklist', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Token is required'
        }
      }
    }
  });

  Blacklist.findByToken = function (token) {
    return Blacklist.findOne({
      where: {
        token: token
      }
    });
  };

  return Blacklist;
};

exports["default"] = _default;