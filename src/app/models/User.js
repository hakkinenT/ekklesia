const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      permission: DataTypes.ENUM("super", "admin", "comum"),
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  User.associate = function (models) {
    User.hasOne(models.Church, {
      as: "Church",
      foreignKey: "user_id",
      sourceKey: "id",
    });
    User.hasOne(models.Member, {
      as: "Member",
      foreignKey: "user_id",
      sourceKey: "id",
    });
  };

  User.prototype.generateToken = function () {
    return jwt.sign(
      { id: this.id, permission: this.permission },
      process.env.SECRET
    );
  };
  return User;
};
