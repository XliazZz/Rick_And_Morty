const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Episode', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    air_date: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    episode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    characters: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    }
  },{
    timestamps: false,
  })
}