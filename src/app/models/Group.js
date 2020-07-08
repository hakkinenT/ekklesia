module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    name: DataTypes.STRING,
    initials: DataTypes.STRING,
  });

  Group.associate = function (models) {
    Group.belongsToMany(models.Member, {
      through: "Members_Groups",
      foreignKey: "group_id",
      as: "Member",
    });

    Group.belongsToMany(models.Role, {
      through: "Groups_Roles",
      foreignKey: "group_id",
      as: "Role",
    });

    Group.belongsToMany(models.Church, {
      through: "Churches_Groups",
      foreignKey: "group_id",
      as: "Church",
    });
  };

  return Group;
};
