'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const mealFoodSeeds = [
  {
    mealId: 1,
    foodId: 2,
    quantity: 1
  },
  {
    mealId: 1,
    foodId: 3,
    quantity: 1
  },
  {
    mealId: 2,
    foodId: 3,
    quantity: 1
  },
  {
    mealId: 2,
    foodId: 1,
    quantity: 1
  },
  {
    mealId: 3,
    foodId: 4,
    quantity: 1
  },
  {
    mealId: 3,
    foodId: 1,
    quantity: 1
  },
  {
    mealId: 4,
    foodId: 2,
    quantity: 1
  },
  {
    mealId: 4,
    foodId: 3,
    quantity: 1
  },
  {
    mealId: 4,
    foodId: 4,
    quantity: 1
  },
  {
    mealId: 5,
    foodId: 2,
    quantity: 2
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'MealFoods';
    await queryInterface.bulkInsert(options, mealFoodSeeds, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'MealFoods';
    await queryInterface.bulkDelete(options, mealFoodSeeds, {});
  }
};
