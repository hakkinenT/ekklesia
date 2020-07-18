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
