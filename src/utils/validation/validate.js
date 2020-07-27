/**
 * express-validator 6.6.0
 *
 * File that checks for errors in validation
 *
 * This file contains middleware that checks if there was an error in the validation of the fields
 */

const { validationResult } = require("express-validator");
const errorFormatter = require("./errorFormatter");

const validate = (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (errors.isEmpty()) {
    return next();
  }
  //console.log(errors);
  return res.status(400).json({
    errors: errors.array(),
  });
};

module.exports = validate;
