"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Not a valid email'
        }
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        }
      }
    }
  }, {
    hooks: {
      beforeSave: function beforeSave(user) {
        if (user.changed('password')) {
          var salt = _bcryptjs["default"].genSaltSync(15);

          user.password = _bcryptjs["default"].hashSync(user.password, salt);
        }
      }
    }
  });

  User.associate = function (_ref) {
    var Favorite = _ref.Favorite;
    User.hasMany(Favorite, {
      as: 'favorites',
      foreignKey: 'owner',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  User.findByEmail = function (email) {
    return User.findOne({
      where: {
        email: email
      }
    });
  };

  return User;
};

exports["default"] = _default;