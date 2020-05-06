"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Siblings", "scholarshipId", {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "scholarships",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Siblings", "scholarshipId");
  }
};
