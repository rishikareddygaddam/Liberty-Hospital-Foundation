"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Grants", "user_id", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "annual", {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn("Grants", "roster", {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn("Grants", "audit", {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn("Grants", "proof", {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn("Grants", "income", {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn("Grants", "letters", {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn("Grants", "main_outcomes", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "describe", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "isAdditional", {
        type: Sequelize.BOOLEAN
      }),
      queryInterface.addColumn("Grants", "additional", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "signature", {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "new_or_current", {
        type: Sequelize.STRING
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
