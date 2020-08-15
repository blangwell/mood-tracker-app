'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('moods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY
      },
      elevated: {
        type: Sequelize.INTEGER
      },
      depressed: {
        type: Sequelize.INTEGER
      },
      irritable: {
        type: Sequelize.INTEGER
      },
      anxious: {
        type: Sequelize.INTEGER
      },
      sleep: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('moods');
  }
};