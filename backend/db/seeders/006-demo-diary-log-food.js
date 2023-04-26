'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const diaryLogFoodSeeds = [
  {
    diaryLogId: 1,
    foodId: 1,
    quantity: 1
  },
  {
    diaryLogId: 2,
    foodId: 2,
    quantity: 2
  },
  {
    diaryLogId: 3,
    foodId: 4,
    quantity: 3
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'DiaryLogFoods';
    await queryInterface.bulkInsert(options, diaryLogFoodSeeds, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'DiaryLogFoods';
    await queryInterface.bulkDelete(options, diaryLogFoodSeeds, {});
  }
};
