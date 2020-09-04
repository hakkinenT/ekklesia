/**
 * express-validator 6.6.0
 *
 * Error format file
 *
 * This file will format the errors found.
 */

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

module.exports = errorFormatter;
