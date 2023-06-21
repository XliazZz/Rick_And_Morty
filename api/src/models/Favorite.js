const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Favorite', {
    id: {
          type: DataTypes.INTEGER, 
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
      },
    name: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    status: {
          type: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
          allowNull: false,
      },
    species: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    gender: {
          type: DataTypes.ENUM('Female', 'Male', 'Genderless', 'unknown'),
          allowNull: false,
      },
        origin: {
          type: DataTypes.STRING,
      },
    image: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    location: {
          type: DataTypes.STRING,
      },
    userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
    characterId: {
          type: DataTypes.INTEGER,
          allowNull: false,
      }, 
  })
};