const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Church_Group = sequelize.define("Church_Group", {
    church_cnpj: {
      type: DataTypes.STRING,
      validate: {
        len: 14,
      },
    },
    group_id: DataTypes.INTEGER,
    amount_of_people: DataTypes.INTEGER,
  });

  Church_Group.associate = function (models) {
    Church_Group.belongsTo(models.Church, { foreignKey: "church_cnpj" });
    Church_Group.belongsTo(models.Group, { foreignKey: "group_id" });
  };
  return Church_Group;
};
