'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const diaryLogMealSeeds = [
  {
    diaryLogId: 1,
    mealId: 1,
    quantity: 1
  },
  {
    diaryLogId: 1,
    mealId: 2,
    quantity: 2
  },
  // {
  //   diaryLogId: 1,
  //   mealId: 2,
  // },
  {
    diaryLogId: 2,
    mealId: 2,
    quantity: 2
  },
  // {
  //   diaryLogId: 2,
  //   mealId: 2,
  // },
  {
    diaryLogId: 3,
    mealId: 3,
    quantity: 3
  },
  // {
  //   diaryLogId: 3,
  //   mealId: 3,
  //   // quantity: 3
  // },
  // {
  //   diaryLogId: 3,
  //   mealId: 3,
  //   // quantity: 3
  // }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'DiaryLogMeals';
    await queryInterface.bulkInsert(options, diaryLogMealSeeds, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'DiaryLogMeals';
    await queryInterface.bulkDelete(options, diaryLogMealSeeds, {});
  }
};
