/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the validation rules for creating a user.
 */

const { checkSchema } = require("express-validator");
const validateString = require("../validateString");

const userCreation = () => {
  return checkSchema({
    church_name: {
      in: ["query"],
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The church_name must be a string",
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
    },
  });
};

const userUpdate = () => {
  return checkSchema({
    church_name: {
      in: ["query"],
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The church_name must be a string",
    },
    "user.username": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      isLength: { options: { min: 3, max: 30 } },
      errorMessage:
        "Username must be a string with a minimum length of 3 and a maximum length of 30",
      optional: true,
    },
    "user.permission": {
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

module.exports = { userCreation, userUpdate };
