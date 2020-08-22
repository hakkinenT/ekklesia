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
      in: ["params", "body"],
      custom: {
        options: (value) => validateCNPJ(value),
      },
      errorMessage: "CNPJ is invalid",
    },
    name: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The name must be a string",
    },
    email: {
      isEmail: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The email has an invalid format",
    },
    creation_date: {
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
    },
    street: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The address must be a string",
    },
    number: {
      isAlphanumeric: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The number contains invalid characters",
    },
    neighborhood: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The neighborhood must be a string",
    },
    zip_code: {
      isNumeric: true,
      custom: {
        options: (value) => validateString(value),
      },
      isLength: { options: 8 },
      optional: true,
      errorMessage: "CEP must contain only numbers",
    },

    complement: {
      isString: true,
      optional: true,
      errorMessage: "The complement must be a string",
    },
    city: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The city must be a string",
    },

    state: {
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
