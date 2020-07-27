/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the validation rules for updating a user.
 */

const { checkSchema } = require("express-validator");
const validateString = require("../validateString");

const userUpdateValidationRules = () => {
  return checkSchema({
    permission: {
      in: ["body"],
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      isIn: {
        options: [["admin", "comum"]],
        errorMessage: "The permission type must be admin or comum",
      },
      errorMessage: "Permission cannot be an empty string",
    },
  });
};

module.exports = userUpdateValidationRules;
