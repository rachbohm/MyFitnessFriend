'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const foodSeeds = [
  {
    id: 1,
    foodName: 'bagel',
    userId: 1,
    calories: 260,
    carbohydrates: 47,
    protein: 12,
    fat: 5,
    servingSizeNum: 1,
    servingSizeUnit: 'bagel',
    servingsPerContainer: 5
  },
  {
    id: 2,
    foodName: 'chocolate',
    userId: 1,
    calories: 160,
    carbohydrates: 13,
    protein: 3,
    fat: 12,
    servingSizeNum: .33,
    servingSizeUnit: 'bar',
    servingsPerContainer: 3
  },
  {
    id: 3,
    foodName: 'avocado',
    userId: 2,
    calories: 240,
    carbohydrates: 13,
    protein: 3,
    fat: 22,
    servingSizeNum: 1,
    servingSizeUnit: 'medium avocado',
    servingsPerContainer: 1
  },
  {
    id: 4,
    foodName: 'super firm tofu',
    userId: 3,
    calories: 130,
    carbohydrates: 2,
    protein: 14,
    fat: 7,
    servingSizeNum: 91,
    servingSizeUnit: 'grams',
    servingsPerContainer: 5
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Foods';
    await queryInterface.bulkInsert(options, foodSeeds, {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Foods';
    await queryInterface.bulkDelete(options, foodSeeds, {})
  }
};
