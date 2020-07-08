const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define("Member", {
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY,
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
    conversion_date: DataTypes.DATEONLY,
    baptism_date: DataTypes.DATEONLY,
    church_cnpj: {
      type: DataTypes.STRING,
      validate: {
        len: 14,
      },
    },
    address_id: DataTypes.INTEGER,
  });

  Member.associate = function (models) {
    Member.belongsTo(models.Address, {
      foreignKey: "address_id",
      targetKey: "id",
    });
    Member.belongsTo(models.Church, {
      foreignKey: "church_cnpj",
      as: "Church",
    });
    Member.hasOne(models.User, { foreignKey: "member_id" });
    Member.hasMany(models.Role, { as: "Role" });
    Member.belongsToMany(models.Group, {
      through: "Members_Groups",
      foreignKey: "member_id",
      as: "Group",
    });
  };
  return Member;
};
