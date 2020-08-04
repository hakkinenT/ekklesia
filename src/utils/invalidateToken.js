const { Invalid_token } = require("../app/models");

const jwt = require("jsonwebtoken");

const promisify = require("util");

module.exports = async (token) => {
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

    await Invalid_token.create({ token, date: decoded.date });
  } catch (error) {
    throw error;
  }
};
