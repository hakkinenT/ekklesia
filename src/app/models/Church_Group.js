const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Church_Group = sequelize.define("Church_Group", {
    churchCnpj: {
      type: DataTypes.STRING,
      validate: {
        len: 14,
      },
    },
    groupId: DataTypes.INTEGER,
    amountOfPeople: DataTypes.INTEGER,
  });

  Church_Group.associate = function (models) {
    Church_Group.belongsTo(models.Church, { foreignKey: "churchCnpj" });
    Church_Group.belongsTo(models.Group, { foreignKey: "groupId" });
  };
  return Church_Group;
};
