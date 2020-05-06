"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Activities", "scholarshipId", {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "scholarships",
        key: "id"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Activities", "scholarshipId");
  }
};
