const uuid = require("uuid/v4");
("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Programs",
      [
        {
          id: uuid(),
          name: "Patient Assistance"
        },
        {
          id: uuid(),
          name: "Hughes Family Assistance"
        },
        {
          id: uuid(),
          name: "Kyleigh's Gift"
        },
        {
          id: uuid(),
          name: "TreeHouse"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
