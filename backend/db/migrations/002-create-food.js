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
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
        // validate: {
        //   validateCalories() {
        //     const expectedCalories =
        //       4 * this.carbohydrates +
        //       4 * this.protein +
        //       9 * this.fat;
        //     const tolerance = 0.01; // Adjust the tolerance value as needed

        //     if (Math.abs(this.calories - expectedCalories) > tolerance) {
        //       throw new Error('Calories do not match the expected value.');
        //     }
        //   }
      },
      carbohydrates: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: true, // Updated to allow null values
        defaultValue: 0 // Added default value of 0
      },
      protein: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: true, // Updated to allow null values
        defaultValue: 0 // Added default value of 0
      },
      fat: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: true, // Updated to allow null values
        defaultValue: 0 // Added default value of 0
      },
      servingSizeNum: {
        type: Sequelize.DECIMAL(6, 2),
        allowNull: false,
      },
      servingSizeUnit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // servingsPerContainer: {
      //   type: Sequelize.FLOAT,
      //   allowNull: false,
      // },
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
