'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require('sequelize');

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
      DiaryLog.belongsToMany(
        models.Food,
        { through: models.DiaryLogFood, foreignKey: 'diaryLogId' }
      );
      // DiaryLog.belongsToMany(
      //   models.Meal,
      //   { through: models.DiaryLogMeal, foreignKey: 'diaryLogId' }
      // );
    }
  }
  DiaryLog.init({
    logName: DataTypes.STRING,
    logDate: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiaryLog',
  });
  return DiaryLog;
};
