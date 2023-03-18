'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const diaryLogSeeds = [
  {
    logName: 'Breakfast',
    logDate: new Date('2023-03-18'),
    userId: 1,
    mealId: 1,
    mealQuantity: 1
  },
  {
    logName: 'Lunch',
    logDate: new Date('2023-03-18'),
    userId: 1,
    mealId: 2,
    mealQuantity: 1
  },
  {
    logName: 'Dinner',
    logDate: new Date('2023-03-18'),
    userId: 1,
    foodId: 1,
    foodQuantity: 2
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'DiaryLogs';
    await queryInterface.bulkInsert(options, diaryLogSeeds, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'DiaryLogs';
    await queryInterface.bulkDelete(options, diaryLogSeeds, {});
  }
};
