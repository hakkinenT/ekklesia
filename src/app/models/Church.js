module.exports = (sequelize, DataTypes) => {
  const Church = sequelize.define("Church", {
    name: DataTypes.STRING,
    cnpj: {
      type: DataTypes.STRING,
      validate: {
        len: 14,
      },
    },
    creationDate: DataTypes.DATEONLY,
    addressId: DataTypes.INTEGER,
  });

  Church.associate = function (models) {
    Church.belongsTo(models.Address, {
      foreignKey: "addressId",
      as: "Address",
    });
    Church.hasMany(models.Member, { as: "Member" });
    Church.belongsToMany(models.Groups, {
      through: "Churches_Groups",
      foreignKey: "churchCnpj",
      as: "Group",
    });
    Church.belongsToMany(models.Role, {
      through: "Churches_Roles",
      foreignKey: "churchCnpj",
      as: "Role",
    });
  };
  return Church;
};
