'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Meal.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      );
      Meal.belongsToMany(
        models.DiaryLog,
        { through: models.DiaryLogMeal, foreignKey: 'mealId'}
      );
      Meal.belongsToMany(
        models.Food,
        { through: models.MealFood, foreignKey: 'mealId' }
      );
    }
  }
  Meal.init({
    mealName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Meal',
  });
  return Meal;
};
