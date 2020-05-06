"use strict";
module.exports = (sequelize, DataTypes) => {
  const GiftService = sequelize.define(
    "GiftService",
    {
      service: DataTypes.STRING,
      no_served: DataTypes.INTEGER,
      funding_used: DataTypes.INTEGER,
      notes: DataTypes.STRING,
      giftId: DataTypes.INTEGER
    },
    {}
  );
  GiftService.associate = function(models) {
    // associations can be defined here
    GiftService.belongsTo(models.Gift, {
      foreignKey: "giftId",
      targetKey: "id"
    });
  };
  return GiftService;
};
