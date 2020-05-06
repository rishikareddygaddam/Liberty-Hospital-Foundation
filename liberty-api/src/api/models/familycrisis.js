"use strict";
module.exports = (sequelize, DataTypes) => {
  const FamilyCrisis = sequelize.define(
    "FamilyCrisis",
    {
      name: DataTypes.STRING,
      no_served: DataTypes.INTEGER,
      funding_used: DataTypes.INTEGER,
      notes: DataTypes.STRING,
      assistance: DataTypes.STRING,
      is_crisis: DataTypes.BOOLEAN,
      familyId: DataTypes.INTEGER
    },
    {}
  );
  FamilyCrisis.associate = function(models) {
    // associations can be defined here
    FamilyCrisis.belongsTo(models.Family, {
      foreignKey: "familyId",
      targetKey: "id"
    });
  };
  return FamilyCrisis;
};
