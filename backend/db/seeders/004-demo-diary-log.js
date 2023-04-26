'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const userTimezoneOffset = new Date().getTimezoneOffset() * 60000; // get the user's timezone offset in milliseconds
const today = new Date(Date.now() - userTimezoneOffset); // apply the offset to today's date
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000); // generate yesterday's date object based on today

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
