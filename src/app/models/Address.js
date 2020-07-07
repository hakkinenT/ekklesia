module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("Address", {
    street: DataTypes.STRING,
    number: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    complement: DataTypes.STRING,
    city: DataTypes,
    state: DataTypes.STRING,
  });

  Address.associate = function (models) {
    Address.hasMany(models.Church, { as: "Church" });
    Address.hasMany(models.Member, { as: "Member" });
  };

  return Address;
};
