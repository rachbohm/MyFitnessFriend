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
      Food.hasMany(
        models.DiaryLog,
        { foreignKey: 'foodId', onDelete: 'CASCADE', hooks: true }
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
    userId: DataTypes.INTEGER,
    calories: DataTypes.FLOAT,
    carbohydrates: DataTypes.FLOAT,
    protein: DataTypes.FLOAT,
    fat: DataTypes.FLOAT,
    servingSizeNum: DataTypes.FLOAT,
    servingSizeUnit: DataTypes.STRING,
    servingsPerContainer: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};
