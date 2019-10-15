export default (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
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

  Favorite.associate = ({User}) => {
    Favorite.belongsTo(User, {
      foreignKey: 'owner',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  Favorite.findByOwner = (owner) => Favorite.findAll({
    where: {
      owner
    }
  });

  return Favorite;
};
