"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "GiftServices",
      [
        {
          service: "Babies born in LH Birthing Center",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "SleepSacks Provided",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "Bereavement Materials Provided",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "Losses",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "Angels Provided",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "NICU Meal Vouchers Provided",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "Carseats Provided",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "Pack & Play",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "Assisted w/ Funeral Costs",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "Diapers Provided",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "Cooling Cot Used",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "Additional Services Provided ",
          no_served: null,
          funding_used: null,
          notes: ""
        },
        {
          service: "Miscarriage Caring Kits",
          no_served: null,
          funding_used: null,
          notes: ""
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
