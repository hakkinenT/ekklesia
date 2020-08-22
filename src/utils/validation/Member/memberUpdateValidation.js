/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the validation rules for updating a member.
 */

const { checkSchema } = require("express-validator");
const validateString = require("../validateString");

const memberUpdateValidation = () => {
  return checkSchema({
    "*.name": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The name must be a string",
    },
    "*.genre": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The genre must be a string",
    },
    "*.date_of_birth": {
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
    },
    "*.email": {
      isEmail: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The email has an invalid format",
    },
    "*.whatsapp": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      isLength: { options: { min: 10, max: 11 } },
      errorMessage: "The whatsapp must be a string",
    },
    "*.profession": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The profession must be a string",
    },
    "*.conversion_date": {
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
    },
    "*.baptism_date": {
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
    },
    "*.street": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The address must be a string",
    },
    "*.number": {
      isAlphanumeric: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The number contains invalid characters",
    },
    "*.neighborhood": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The neighborhood must be a string",
    },
    "*.zip_code": {
      isNumeric: true,
      custom: {
        options: (value) => validateString(value),
      },
      isLength: { options: 8 },
      optional: true,
      errorMessage: "CEP must contain only numbers",
    },

    "*.complement": {
      isString: true,
      optional: true,
      errorMessage: "The complement must be a string",
    },
    "*.city": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The city must be a string",
    },
    "*.state": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The state must be a string",
    },
    church_name: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The church_name must be a string",
    },
  });
};

module.exports = memberUpdateValidation;
