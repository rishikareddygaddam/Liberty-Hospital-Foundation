"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Patients", "month", {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn("Gifts", "month", {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn("Families", "month", {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn("GiftServices", "giftId", {
        type: Sequelize.INTEGER,
        references: {
          model: "gifts",
          key: "id"
        }
      }),
      queryInterface.addColumn("FamilyCrises", "familyId", {
        type: Sequelize.INTEGER,
        references: {
          model: "families",
          key: "id"
        }
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
