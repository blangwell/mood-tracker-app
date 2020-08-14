'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  mood.init({
    date: DataTypes.DATEONLY,
    elevated: DataTypes.INTEGER,
    depressed: DataTypes.INTEGER,
    irritable: DataTypes.INTEGER,
    anxious: DataTypes.INTEGER,
    sleep: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'mood',
  });
  return mood;
};