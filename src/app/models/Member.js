const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define("Member", {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    whatsapp: {
      type: DataTypes.STRING,
      max: 11,
      min: 10,
    },
    profession: DataTypes.STRING,
    conversionDate: DataTypes.DATEONLY,
    baptismDate: DataTypes.DATEONLY,
    churchCnpj: {
      type: DataTypes.STRING,
      validate: {
        len: 14,
      },
    },
    addressId: DataTypes.INTERGER,
  });

  Member.associate = function (models) {
    Member.belongsTo(models.Address, {
      foreignKey: "addressId",
      as: "Address",
    });
    Member.belongsTo(models.Church, { foreignKey: "churchCnpj", as: "Church" });
    Member.hasOne(models.User, { foreignKey: "memberId" });
    Member.hasMany(models.Role, { as: "Role" });
    Member.belongsToMany(models.Group, {
      through: "Members_Groups",
      foreignKey: "memberId",
      as: "Group",
    });
  };
  return Member;
};
