module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    permission: DataTypes.ENUM("super", "admin", "comum"),
  });

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
  return User;
};
