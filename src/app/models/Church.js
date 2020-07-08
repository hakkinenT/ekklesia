module.exports = (sequelize, DataTypes) => {
  const Church = sequelize.define("Church", {
    name: DataTypes.STRING,
    cnpj: {
      type: DataTypes.STRING,
      validate: {
        len: 14,
      },
    },
    creation_date: DataTypes.DATEONLY,
    address_id: DataTypes.INTEGER,
  });

  Church.associate = function (models) {
    Church.belongsTo(models.Address, {
      foreignKey: "address_id",
      targetKey: "id",
    });
    Church.hasMany(models.Member, { as: "Member" });
    Church.belongsToMany(models.Group, {
      through: "Churches_Groups",
      foreignKey: "church_cnpj",
      as: "Group",
    });
    Church.belongsToMany(models.Role, {
      through: "Churches_Roles",
      foreignKey: "church_cnpj",
      as: "Role",
    });
  };
  return Church;
};
