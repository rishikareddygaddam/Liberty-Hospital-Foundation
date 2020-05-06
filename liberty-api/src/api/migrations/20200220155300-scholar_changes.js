"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Scholarships", "graduate_month", {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Scholarships", "is_relatives", {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn("Scholarships", "plan_to_work", {
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
