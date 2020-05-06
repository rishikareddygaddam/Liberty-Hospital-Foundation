"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Grants", "primary", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "tax_id", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "contact", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "person_title", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "address", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "phone", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "fax", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "email", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "title", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "new_or_current", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "funding_past", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "synopsis", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "priority", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "main_outcomes", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "outcomes", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "sustainability", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "score", {
        allowNull: true,
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn("Grants", "comments", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "status", {
        allowNull: true,
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Grants", "links", {
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
