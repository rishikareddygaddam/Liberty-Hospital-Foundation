const uuid = require("uuid/v4");
("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Scholarships", "id", {
        type: Sequelize.UUID,
        autoIncrement: false,
        allowNull: false
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
