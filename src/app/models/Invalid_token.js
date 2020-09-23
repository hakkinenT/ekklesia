module.exports = (sequelize, DataTypes) => {
  const Invalid_token = sequelize.define("Invalid_token", {
    token: DataTypes.STRING,
    date: DataTypes.DATE,
  });

  return Invalid_token;
};
