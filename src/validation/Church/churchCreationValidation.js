/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the validation rules for creating a church.
 */

const { checkSchema } = require("express-validator");
const { validateCNPJ } = require("../validate_CPF_CNPJ");
const validateString = require("../validateString");

const churchCreationValidation = () => {
  return checkSchema({
    name: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The name must be a string",
    },
    cnpj: {
      custom: {
        options: (value) => validateCNPJ(value),
      },
      errorMessage: "CNPJ is invalid",
    },
    email: {
      isEmail: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The email has an invalid format",
    },
    creation_date: {
      custom: {
        options: (value) => validateString(value),
      },
    },
    street: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The address must be a string",
    },
    number: {
      isAlphanumeric: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The number contains invalid characters",
    },
    neighborhood: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The neighborhood must be a string",
    },
    zip_code: {
      isNumeric: true,
      isLength: { options: 8 },
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "CEP must contain only numbers",
    },
    complement: {
      isString: true,
      errorMessage: "The complement must be a string",
      optional: true,
    },
    city: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The city must be a string",
    },
    state: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The state must be a string",
    },
    password: {
      custom: {
        options: (value) => validateString(value),
      },
      isLength: { options: { min: 8, max: 16 } },
      errorMessage:
        "The password must be a string with a minimum length of 8 and a maximum length of 16",
    },
  });
};

module.exports = churchCreationValidation;
