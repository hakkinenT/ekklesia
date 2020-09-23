/**
 * express-validator 6.6.0
 *
 * File that checks for errors in validation
 *
 * This file contains middleware that checks if there was an error in the validation of the fields
 */

const { validationResult } = require("express-validator");

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return {
    type: "Error",
    name: "Validation Failure",
    location: location,
    message: msg,
    param: param,
    value: value,
    nestedErrors: nestedErrors,
  };
};

const validate = (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    errors: errors.array(),
  });
};

module.exports = validate;
