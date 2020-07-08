module.exports = (sequelize, DataTypes) => {
  const Group_Role = sequelize.define("Group_Role", {
    group_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
  });

  Group_Role.associate = function (models) {
    Group_Role.belongsTo(models.Group, { foreignKey: "group_id" });
    Group_Role.belongsTo(models.Role, { foreignKey: "role_id" });
  };

  return Group_Role;
};
