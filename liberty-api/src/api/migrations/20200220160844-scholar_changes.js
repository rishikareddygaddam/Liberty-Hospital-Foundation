"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Scholarships", "status", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Scholarships", "score", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("Scholarships", "comments", {
        type: Sequelize.STRING
      })
      // queryInterface.addColumn("Scholarships", "extra", {
      //   type: Sequelize.STRING
      // })
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
