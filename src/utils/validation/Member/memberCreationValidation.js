/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the validation rules for creating a member.
 */

const { checkSchema } = require("express-validator");
const validateString = require("../validateString");

const memberCreationValidation = () => {
  return checkSchema({
    name: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The name must be a string",
    },
    genre: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The genre must be a string",
    },
    date_of_birth: {
      custom: {
        options: (value) => validateString(value),
      },
    },
    email: {
      isEmail: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The email has an invalid format",
    },
    whatsapp: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      isLength: { options: { min: 10, max: 11 } },
      errorMessage: "The whatsapp must be a string",
    },
    profession: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The profession must be a string",
    },
    conversion_date: {
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
    },
    baptism_date: {
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
    church_name: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The church_name must be a string",
    },
  });
};

module.exports = memberCreationValidation;
