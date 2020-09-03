/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the validation rules for updating a user.
 */

const { checkSchema } = require("express-validator");
const validateString = require("../validateString");

const userUpdateValidation = () => {
  return checkSchema({
    username: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      isLength: { options: { min: 3, max: 30 } },
      errorMessage:
        "Username must be a string with a minimum length of 3 and a maximum length of 30",
      optional: true,
    },
    permission: {
      in: ["body"],
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      isIn: {
        options: [["admin"]],
        errorMessage: "The permission type must be admin or comum",
      },
      errorMessage: "Permission cannot be an empty string",
      optional: true,
    },
  });
};

module.exports = userUpdateValidation;
