const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Member_Group = sequelize.define("Member_Group", {
    member_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER,
    entry_date: DataTypes.DATEONLY,
    departure_date: DataTypes.DATEONLY,
  });

  Member_Group.associate = function (models) {
    Member_Group.belongsTo(models.Member, { foreignKey: "member_id" });
    Member_Group.belongsTo(models.Group, { foreignKey: "group_id" });
  };

  return Member_Group;
};
