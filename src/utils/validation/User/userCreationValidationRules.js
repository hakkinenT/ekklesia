/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the validation rules for creating a user.
 */

const { checkSchema } = require("express-validator");
const validateString = require("../validateString");

const userCreationValidationRules = () => {
  return checkSchema({
    username: {
      in: ["body"],
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      isLength: { options: { min: 3, max: 30 } },
      errorMessage:
        "Username must be a string with a minimum length of 3 and a maximum length of 30",
    },
    password: {
      in: ["body"],
      custom: {
        options: (value) => validateString(value),
      },
      isLength: { options: { min: 8, max: 16 } },
      errorMessage:
        "The password must be a string with a minimum length of 8 and a maximum length of 16",
    },
  });
};

module.exports = userCreationValidationRules;
