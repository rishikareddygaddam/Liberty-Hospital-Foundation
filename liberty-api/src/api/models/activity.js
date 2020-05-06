"use strict";
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define(
    "Activity",
    {
      name: DataTypes.STRING,
      year1516: DataTypes.BOOLEAN,
      year1617: DataTypes.BOOLEAN,
      year1718: DataTypes.BOOLEAN,
      year1819: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
      scholarshipId: DataTypes.UUID
    },
    {}
  );
  Activity.associate = function(models) {
    // associations can be defined here
    Activity.belongsTo(models.Scholarship, {
      foreignKey: "scholarshipId",
      targetKey: "id"
    });
  };
  return Activity;
};
