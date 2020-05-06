"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Grants", "mission", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "annual_file", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "roster_file", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "audit_file", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "proof_file", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "letters_file", {
        allowNull: true,
        type: Sequelize.STRING
      }),

      queryInterface.addColumn("Grants", "director", {
        allowNull: true,
        type: Sequelize.STRING
      }),

      queryInterface.addColumn("Grants", "funding", {
        allowNull: true,
        type: Sequelize.STRING
      }),

      queryInterface.addColumn("Grants", "implementation", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      ,
      queryInterface.addColumn("Grants", "rfp", {
        allowNull: true,
        type: Sequelize.STRING
      }),

      queryInterface.addColumn("Grants", "zip", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "equity", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "population", {
        allowNull: true,
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
