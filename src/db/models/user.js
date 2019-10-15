import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      beforeSave: (user) => {
        if (user.changed('password')) {
          const salt = bcrypt.genSaltSync(15);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  });

  User.associate = ({Favorite}) => {
    User.hasMany(Favorite, {
      as: 'favorites',
      foreignKey: 'owner',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  User.findByEmail = (email) => User.findOne({
    where: {
      email
    }
  });

  return User;
};
