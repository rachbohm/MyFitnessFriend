'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const diaryLogSeeds = [
  {
    logName: 'Breakfast',
    logDate: today,
    userId: 1
  },
  {
    logName: 'Lunch',
    logDate: yesterday,
    userId: 1
  },
  {
    logName: 'Dinner',
    logDate: yesterday,
    userId: 1
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
