const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Church_Role = sequelize.define("Church_Role", {
    churchCnpj: {
      type: DataTypes.STRING,
      validate: {
        len: 14,
      },
    },
    roleId: DataTypes.INTEGER,
  });

  Church_Role.associate = function (models) {
    Church_Role.belongsTo(models.Church, { foreignKey: "churchCnpj" });
    Church_Role.belongsTo(models.Role, { foreignKey: "roleId" });
  };

  return Church_Role;
};
