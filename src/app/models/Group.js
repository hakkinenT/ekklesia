module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    name: DataTypes.STRING,
    initials: DataTypes.STRING,
    amountOfPeople: DataTypes.INTEGER,
  });

  Group.associate = function (models) {
    Group.belongsToMany(models.Member, {
      through: "Members_Groups",
      foreignKey: "groupId",
      as: "Member",
    });

    Group.belongsToMany(models.Role, {
      through: "Groups_Roles",
      foreignKey: "groupId",
      as: "Role",
    });

    Group.belongsToMany(models.Church, {
      through: "Churches_Groups",
      foreignKey: "groupId",
      as: "Church",
    });
  };

  return Group;
};
