'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      );
      Food.belongsToMany(
        models.DiaryLog,
        { through: models.DiaryLogFood, foreignKey: 'foodId' }
      );
      Food.belongsToMany(
        models.Meal,
        { through: models.MealFood, foreignKey: 'foodId' }
      );
    }
  }
  Food.init({
    foodName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    carbohydrates: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    servingSizeNum: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    servingSizeUnit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    servingsPerContainer: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};
