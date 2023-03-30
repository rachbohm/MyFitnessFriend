'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiaryLogFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DiaryLogFood.belongsTo(models.DiaryLog, {
        foreignKey: 'diaryLogId'
      });
      DiaryLogFood.belongsTo(models.Food, {
        foreignKey: 'foodId'
      });
    }
  }
  DiaryLogFood.init({
    diaryLogId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiaryLogFood',
  });
  return DiaryLogFood;
};
