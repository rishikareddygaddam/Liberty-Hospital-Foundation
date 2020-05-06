"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Grants", "user_id", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "primary", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "tax_id", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "contact", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "person_title", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "address", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "phone", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "fax", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "email", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "title", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "new_or_current", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "funding_past", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "synopsis", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "priority", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "main_outcomes", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "outcomes", {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Grants", "sustainability", {
        allowNull: false,
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
