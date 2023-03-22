'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DiaryLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      logName: {
        type: Sequelize.STRING
      },
      logDate: {
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      mealId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Meals',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      mealQuantity: {
        type: Sequelize.FLOAT
      },
      foodId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Food',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      foodQuantity: {
        type: Sequelize.INTEGER
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DiaryLogs');
  }
};