module.exports = (sequelize, DataTypes) => {
  const Church = sequelize.define("Church", {
    name: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    email: DataTypes.STRING,
    creation_date: DataTypes.DATEONLY,
    address_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  });

  Church.associate = function (models) {
    Church.belongsTo(models.Address, {
      as: "Address",
      foreignKey: "address_id",
      targetKey: "id",
    });
    Church.belongsTo(models.User, {
      as: "User",
      foreignKey: "user_id",
      targetKey: "id",
    });
    Church.hasMany(models.Member, {
      as: "Member",
      foreignKey: "church_cnpj",
      sourceKey: "cnpj",
    });
  };
  return Church;
};
