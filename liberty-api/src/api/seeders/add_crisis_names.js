"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "FamilyCrises",
      [
        {
          name:
            "Loss of home or disruption of the use of home due to fire or natural disaster",
          no_served: null,
          funding_used: null,
          assistance: "",
          notes: "",
          is_crisis: false
        },
        {
          name: "Death of spouse/partner, resulting in loss of income",
          no_served: null,
          funding_used: null,
          assistance: "",
          notes: "",
          is_crisis: false
        },
        {
          name:
            "Assistance with funeral support for an immediate family member",
          no_served: null,
          funding_used: null,
          assistance: "",
          notes: "",
          is_crisis: false
        },
        {
          name:
            "Devastating illness, injury, or accident of employee outside of the employees control",
          no_served: null,
          funding_used: null,
          assistance: "",
          notes: "",
          is_crisis: false
        },
        {
          name: "Holiday Family Adoption ",
          no_served: null,
          funding_used: null,
          assistance: "",
          notes: "",
          is_crisis: true
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
