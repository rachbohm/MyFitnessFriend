'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const mealSeeds = [
  {
    id: 1,
    mealName: 'chocolate-covered avocado id 1',
    userId: 1
  },
  {
    id: 2,
    mealName: 'avocado toast id 2',
    userId: 1
  },
  {
    id: 3,
    mealName: 'tofu sandwich id 3',
    userId: 1
  },
  {
    id: 4,
    mealName: 'chocolate pudding id 4',
    userId: 1
  },
  {
    id: 5,
    mealName: '2 chocolate bars id 5',
    userId: 1
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Meals';
    await queryInterface.bulkInsert(options, mealSeeds, {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Meals';
    await queryInterface.bulkDelete(options, mealSeeds, {})
  }
};
