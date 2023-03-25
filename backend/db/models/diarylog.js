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
      DiaryLog.belongsTo(
        models.Food,
        { foreignKey: 'foodId', as: 'food' }
      );
      DiaryLog.belongsTo(
        models.Meal,
        { foreignKey: 'mealId', as: 'meal' }
      );
    }
  }
  DiaryLog.init({
    logName: DataTypes.STRING,
    logDate: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    mealId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        hasEitherMealOrFood() {
          if (!this.foodId && !this.mealId) {
            throw new Error('A diary log must have either a food or a meal');
          }
          if (this.foodId && this.mealId) {
            throw new Error('A diary log cannot have both a food and a meal');
          }
        }
      }
    },
    mealQuantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isPositive(value) {
          if (value <= 0) {
            throw new Error('Meal quantity must be positive');
          }
        }
      }
    },
    foodId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        hasEitherMealOrFood() {
          if (!this.foodId && !this.mealId) {
            throw new Error('A diary log must have either a food or a meal');
          }
          if (this.foodId && this.mealId) {
            throw new Error('A diary log cannot have both a food and a meal');
          }
        }
      }
    },
    foodQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isPositive(value) {
          if (value <= 0) {
            throw new Error('Food quantity must be positive');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'DiaryLog',
  });
  return DiaryLog;
};
