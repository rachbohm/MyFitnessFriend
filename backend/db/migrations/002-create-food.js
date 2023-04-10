"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      foodName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      calories: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      carbohydrates: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      protein: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fat: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      servingSizeNum: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      servingSizeUnit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      servingsPerContainer: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Food';
    await queryInterface.dropTable(options);
  }
};
