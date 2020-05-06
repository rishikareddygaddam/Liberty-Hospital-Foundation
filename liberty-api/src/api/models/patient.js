"use strict";
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    "Patient",
    {
      no_of_unduplicated: DataTypes.INTEGER,
      additional_services: DataTypes.STRING,
      story_patient: DataTypes.STRING,
      patient_contact: DataTypes.BOOLEAN,
      month: DataTypes.INTEGER
    },
    {}
  );
  Patient.associate = function(models) {
    // associations can be defined here
  };
  return Patient;
};
