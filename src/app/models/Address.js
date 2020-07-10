module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    address: DataTypes.STRING,
    number: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    complement: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
  });

  Address.associate = function (models) {
    Address.hasOne(models.Church, {
      as: "Church",
      foreignKey: "address_id",
      sourceKey: "id",
    });
    Address.hasMany(models.Member, {
      as: "Member",
      foreignKey: "address_id",
    });
  };

  return Address;
};
