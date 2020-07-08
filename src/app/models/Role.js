const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    name: DataTypes.STRING,
    member_id: DataTypes.STRING,
  });

  Role.associate = function (models) {
    Role.belongsTo(models.Member, { foreignKey: "member_id", as: "Member" });
    Role.belongsToMany(models.Group, {
      through: "Groups_Roles",
      foreignKey: "role_id",
      as: "Group",
    });
    Role.belongsToMany(models.Church, {
      through: "Churches_Roles",
      foreignKey: "role_id",
      as: "Church",
    });
  };
  return Role;
};
