'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MealFood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   MealFood.associate = (models) => {
    //     MealFood.belongsTo(models.Food, {
    //       foreignKey: 'foodId',
    //       onDelete: 'CASCADE' // Add this line to specify the onDelete behavior
    //     });
    //     MealFood.belongsTo(models.Meal, {
    //       foreignKey: 'mealId',
    //       onDelete: 'CASCADE' // Add this line to specify the onDelete behavior
    //     });
    //   };
    }
  }
  MealFood.init({
    foodId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MealFood',
  });
  return MealFood;
};
