const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Member_Group = sequelize.define("Member_Group", {
    memberId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    entryDate: DataTypes.DATEONLY,
    departureDate: DataTypes.DATEONLY,
  });

  Member_Group.associate = function (models) {
    Member_Group.belongsTo(models.Member, { foreignKey: "memberId" });
    Member_Group.belongsTo(models.Group, { foreignKey: "groupId" });
  };

  return Member_Group;
};
