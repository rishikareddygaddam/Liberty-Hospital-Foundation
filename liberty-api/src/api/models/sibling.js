"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sibling = sequelize.define(
    "Sibling",
    {
      name: DataTypes.STRING,
      college_attending: DataTypes.BOOLEAN,
      where: DataTypes.STRING,
      year: DataTypes.INTEGER,
      scholarshipId: DataTypes.UUID
    },
    {}
  );
  Sibling.associate = function(models) {
    // associations can be defined here
    Sibling.belongsTo(models.Scholarship, {
      foreignKey: "scholarshipId",
      targetKey: "id"
    });
  };
  return Sibling;
};
