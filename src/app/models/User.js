module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: 8,
      },
    },
    permission: DataTypes.ENUM("super", "admin", "comum"),
  });

  User.associate = function (models) {
    User.belongsTo(models.Church, {
      as: "Church",
      foreignKey: "user_id",
      sourceKey: "id",
    });
    User.belongsTo(models.Member, {
      as: "Member",
      foreignKey: "user_id",
      sourceKey: "id",
    });
  };
  return User;
};
