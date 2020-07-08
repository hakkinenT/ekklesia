const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Church_Role = sequelize.define("Church_Role", {
    church_cnpj: {
      type: DataTypes.STRING,
      validate: {
        len: 14,
      },
    },
    role_id: DataTypes.INTEGER,
  });

  Church_Role.associate = function (models) {
    Church_Role.belongsTo(models.Church, { foreignKey: "church_cnpj" });
    Church_Role.belongsTo(models.Role, { foreignKey: "role_id" });
  };

  return Church_Role;
};
