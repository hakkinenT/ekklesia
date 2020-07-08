module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: 8,
      },
    },
    permission: DataTypes.ENUM("admin", "comum"),
    member_id: DataTypes.INTEGER,
  });

  User.associate = function (models) {
    User.belongsTo(models.Member, { foreignKey: "member_id", as: "Member" });
  };
  return User;
};
