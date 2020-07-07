module.exports = (sequelize, DataTypes) => {
  const Group_Role = sequelize.define("Group_Role", {
    groupId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  });

  Group_Role.associate = function (models) {
    Group_Role.belongsTo(models.Group, { foreignKey: "groupId" });
    Group_Role.belongsTo(models.Role, { foreignKey: "roleId" });
  };

  return Group_Role;
};
