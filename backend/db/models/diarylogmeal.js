'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiaryLogMeal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DiaryLogMeal.belongsTo(models.DiaryLog, { foreignKey: 'diaryLogId' });
      DiaryLogMeal.belongsTo(models.Meal, { foreignKey: 'mealId' });
    }
  }
  DiaryLogMeal.init({
    diaryLogId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiaryLogMeal',
  });
  return DiaryLogMeal;
};
