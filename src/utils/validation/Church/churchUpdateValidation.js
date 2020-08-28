/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the validation rules for updating a church.
 */

const { checkSchema } = require("express-validator");
const validateCNPJ = require("./validateCNPJ");
const validateString = require("../validateString");

const churchUpdateValidation = () => {
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

module.exports = churchUpdateValidation;
