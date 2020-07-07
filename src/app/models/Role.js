const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    name: DataTypes.STRING,
    memberId: DataTypes.STRING,
  });

  Role.associate = function (models) {
    Role.belongsTo(models.Member, { foreignKey: "memberId", as: "Member" });
    Role.belongsToMany(models.Group, {
      through: "Groups_Roles",
      foreignKey: "roleId",
      as: "Group",
    });
    Role.belongsToMany(models.Church, {
      through: "Churches_Roles",
      foreignKey: "roleId",
      as: "Church",
    });
  };
  return Role;
};
