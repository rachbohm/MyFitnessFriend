'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DiaryLogFoods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      diaryLogId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'DiaryLogs',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      foodId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Food',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
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
    options.tableName = 'DiaryLogFoods';
    await queryInterface.dropTable(options);
  }
};
