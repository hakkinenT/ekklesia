/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the validation rules for updating a member.
 */

const { checkSchema } = require("express-validator");
const validateString = require("../validateString");
const { validateCPF } = require("../validate_CPF_CNPJ");

const memberUpdateValidation = () => {
  return checkSchema({
    church_name: {
      in: ["query"],
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The church_name must be a string",
    },
    "member.name": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The name must be a string",
    },
    "member.cpf": {
      custom: {
        options: (value) => validateCPF(value),
      },
      errorMessage: "CPF is invalid",
    },
    "member.genre": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The genre must be a string",
    },
    "member.age": {
      isInt: true,
      custom: {
        options: (value) => {
          if (value >= 7) {
            return value;
          }

          throw new Error("The age is less than 7");
        },
      },
      optional: true,
      errorMessage: "The age must be greater than or equal to 7",
    },
    "member.date_of_birth": {
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
    },
    "member.email": {
      isEmail: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The email has an invalid format",
    },
    "member.whatsapp": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      isLength: { options: { min: 10, max: 11 } },
      errorMessage: "The whatsapp must be a string",
    },
    "member.profession": {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
      errorMessage: "The profession must be a string",
    },
    "member.conversion_date": {
      custom: {
        options: (value) => validateString(value),
      },
      optional: true,
    },
    "member.baptism_date": {
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

module.exports = memberUpdateValidation;
