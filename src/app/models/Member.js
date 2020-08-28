const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define("Member", {
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    genre: DataTypes.ENUM("Masculino", "Feminino"),
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
    user_id: DataTypes.INTEGER,
  });

  Member.associate = function (models) {
    Member.belongsTo(models.Address, {
      foreignKey: "address_id",
      targetKey: "id",
    });
    Member.belongsTo(models.Church, {
      foreignKey: "church_cnpj",
      as: "Church",
      targetKey: "cnpj",
    });

    Member.belongsTo(models.User, {
      as: "User",
      foreignKey: "user_id",
      targetKey: "id",
    });
    Member.hasMany(models.Role, { as: "Role" });
    Member.belongsToMany(models.Group, {
      through: "Members_Groups",
      foreignKey: "member_cpf",
      as: "Group",
    });
  };
  return Member;
};
