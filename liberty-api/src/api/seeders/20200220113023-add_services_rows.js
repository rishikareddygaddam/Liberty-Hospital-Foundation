"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "PatientServices",
      [
        //
        {
          service: "Women's Imaging",
          no_served: null,
          funding_used: null,
          notes: "",
          patientId: 2
        },
        {
          service: "Clothes Closet",
          no_served: null,
          funding_used: null,
          notes: "",
          patientId: 2
        },
        {
          service: "Dialysis",
          no_served: null,
          funding_used: null,
          notes: "",
          patientId: 2
        },
        {
          service: "Language Interpretation",
          no_served: null,
          funding_used: null,
          notes: "",
          patientId: 2
        },
        {
          service: "Durable Medical Equipment",
          no_served: null,
          funding_used: null,
          notes: "",
          patientId: 2
        },
        {
          service: "Sam Rodgers Co-pays",
          no_served: null,
          funding_used: null,
          notes: "",
          patientId: 2
        },
        {
          service: "Scales",
          no_served: null,
          funding_used: null,
          notes: "",
          patientId: 2
        },
        {
          service: "Student Assistance",
          no_served: null,
          funding_used: null,
          notes: "",
          patientId: 2
        },
        {
          service: "Transportation Assistance",
          no_served: null,
          funding_used: null,
          notes: "",
          patientId: 2
        },
        {
          service: "Cardiac Rehab",
          no_served: null,
          funding_used: null,
          notes: "",
          patientId: 2
        },
        {
          service: "Medication Assistance",
          no_served: null,
          funding_used: null,
          notes: "",
          patientId: 2
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
