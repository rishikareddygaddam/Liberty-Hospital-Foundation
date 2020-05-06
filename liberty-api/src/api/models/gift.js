"use strict";
module.exports = (sequelize, DataTypes) => {
  const Gift = sequelize.define(
    "Gift",
    {
      no_of_unduplicated: DataTypes.INTEGER,
      story_patient: DataTypes.STRING,
      patient_contact: DataTypes.BOOLEAN,
      month: DataTypes.INTEGER
    },
    {}
  );
  Gift.associate = function(models) {
    // associations can be defined here
  };
  return Gift;
};
