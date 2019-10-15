"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Favorite = sequelize.define('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Favorite.associate = function (_ref) {
    var User = _ref.User;
    Favorite.belongsTo(User, {
      foreignKey: 'owner',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  Favorite.findByOwner = function (owner) {
    return Favorite.findAll({
      where: {
        owner: owner
      }
    });
  };

  return Favorite;
};

exports["default"] = _default;