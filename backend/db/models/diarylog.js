'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiaryLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DiaryLog.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      );
      DiaryLog.belongsTo(
        models.Food,
        { foreignKey: 'foodId' }
      );
      DiaryLog.belongsTo(
        models.Meal,
        { foreignKey: 'mealId' }
      );
    }
  }
  DiaryLog.init({
    logName: DataTypes.STRING,
    logDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER,
    mealQuantity: DataTypes.FLOAT,
    foodId: DataTypes.INTEGER,
    foodQuantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiaryLog',
  });
  return DiaryLog;
};
