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
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      // validate: {
      //   validateCalories() {
      //     const expectedCalories =
      //       4 * this.carbohydrates +
      //       4 * this.protein +
      //       9 * this.fat;
      //     const tolerance = 0.01; // Adjust the tolerance value as needed

      //     if (Math.abs(this.calories - expectedCalories) > tolerance) {
      //       throw new Error('Calories do not match the expected value.');
      //     }
      //   }
      // },
    },
    carbohydrates: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true, // Allow null values
      defaultValue: 0 // Set a default value of 0
    },
    protein: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true, // Allow null values
      defaultValue: 0 // Set a default value of 0
    },
    fat: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true, // Allow null values
      defaultValue: 0 // Set a default value of 0
    },
    servingSizeNum: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    servingSizeUnit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // servingsPerContainer: {
    //   type: DataTypes.FLOAT,
    //   allowNull: false
    // }
  }, {
    sequelize,
    modelName: 'Food',
  });
  Food.beforeSave((food, options) => {
    const calculatedCalories = 4 * food.carbohydrates + 4 * food.protein + 9 * food.fat;
    food.calories = parseFloat(calculatedCalories).toFixed(2);
  });
  return Food;
};
