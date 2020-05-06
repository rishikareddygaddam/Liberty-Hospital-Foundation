"use strict";
module.exports = (sequelize, DataTypes) => {
  const PatientService = sequelize.define(
    "PatientService",
    {
      service: DataTypes.STRING,
      no_served: DataTypes.INTEGER,
      funding_used: DataTypes.INTEGER,
      notes: DataTypes.STRING,
      patientId: DataTypes.INTEGER
    },
    {}
  );
  PatientService.associate = function(models) {
    // associations can be defined here
    PatientService.belongsTo(models.Patient, {
      foreignKey: "patientId",
      targetKey: "id"
    });
  };
  return PatientService;
};
