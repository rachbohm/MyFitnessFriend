'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const mealSeeds = [
  {
    id: 1,
    mealName: 'chocolate-covered avocado',
    userId: 1,
    mealNotes: 'the best way to make a brown avocado even more brown',
    servingSizeNum: 1,
    servingSizeUnit: 'portion'
  },
  {
    id: 2,
    mealName: 'avocado toast',
    userId: 1,
    mealNotes: 'avocado toast, but on a bagel',
    servingSizeNum: 1,
    servingSizeUnit: 'portion'
  },
  {
    id: 3,
    mealName: 'tofu sandwich',
    userId: 2,
    mealNotes: 'add some salt for extra flavor',
    servingSizeNum: 1,
    servingSizeUnit: 'portion'
  },
  {
    id: 4,
    mealName: 'chocolate pudding',
    userId: 3,
    mealNotes: 'chocolate pudding using tofu and avocado as the base',
    servingSizeNum: .5,
    servingSizeUnit: 'recipe'
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
