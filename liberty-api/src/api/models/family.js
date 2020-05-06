"use strict";
module.exports = (sequelize, DataTypes) => {
  const Family = sequelize.define(
    "Family",
    {
      no_of_unduplicated: DataTypes.INTEGER,
      story_patient: DataTypes.STRING,
      patient_contact: DataTypes.BOOLEAN,
      additional_services: DataTypes.STRING,
      month: DataTypes.INTEGER
    },
    {}
  );
  Family.associate = function(models) {
    // associations can be defined here
  };
  return Family;
};
