'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FamilyCrises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      no_served: {
        type: Sequelize.INTEGER
      },
      funding_used: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.STRING
      },
      assistance: {
        type: Sequelize.STRING
      },
      is_crisis: {
        type: Sequelize.BOOLEAN
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FamilyCrises');
  }
};