/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the validation rules for creating and updating a church.
 */

const { checkSchema } = require("express-validator");
const { validateCNPJ } = require("../validate_CPF_CNPJ");
const validateString = require("../validateString");

const churchCreation = () => {
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

const churchUpdate = () => {
  return checkSchema({
    cnpj: {
      in: ["params"],
      custom: {
        options: (value) => validateCNPJ(value),
      },
      errorMessage: "CNPJ is invalid",
    },
    "church.name": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The name must be a string",
    },
    "church.cnpj": {
      in: ["body"],
      custom: {
        options: (value) => validateCNPJ(value),
      },
      optional: true,
      errorMessage: "CNPJ is invalid",
    },
    "church.email": {
      isEmail: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The email has an invalid format",
    },
    "church.creation_date": {
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
    },
    "address.street": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The address must be a string",
    },
    "address.number": {
      isAlphanumeric: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The number contains invalid characters",
    },
    "address.neighborhood": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The neighborhood must be a string",
    },
    "address.zip_code": {
      isNumeric: true,
      custom: {
        options: (value) => validateString(value),
      },
      isLength: { options: 8 },
      optional: true,
      errorMessage: "CEP must contain only numbers",
    },

    "address.complement": {
      isString: true,
      optional: true,
      errorMessage: "The complement must be a string",
    },
    "address.city": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The city must be a string",
    },

    "address.state": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The state must be a string",
    },
  });
};

const cnpjParameter = () => {
  return checkSchema({
    cnpj: {
      in: ["params"],
      custom: {
        options: (value) => validateCNPJ(value),
      },
      errorMessage: "CNPJ is invalid",
    },
  });
};

module.exports = { churchCreation, churchUpdate, cnpjParameter };
