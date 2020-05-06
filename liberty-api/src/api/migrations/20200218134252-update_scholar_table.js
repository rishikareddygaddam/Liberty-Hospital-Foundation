"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Scholarships", "relative", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Scholarships", "g1_state", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Scholarships", "g2_state", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Scholarships", "date", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Scholarships", "signature", {
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
