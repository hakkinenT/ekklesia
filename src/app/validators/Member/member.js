/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the validation rules for creating a member.
 */

const { checkSchema } = require("express-validator");
const validateString = require("../validateString");
const { validateCPF } = require("../validate_CPF_CNPJ");

const memberCreation = () => {
  return checkSchema({
    church_name: {
      in: ["query"],
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The church_name must be a string",
    },
    name: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The name must be a string",
    },
    cpf: {
      custom: {
        options: (value) => validateCPF(value),
      },
      errorMessage: "CPF is invalid",
    },
    genre: {
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The genre must be a string",
    },
    age: {
      isInt: true,
      custom: {
        options: (value) => {
          if (value >= 7) {
            return value;
          }

          throw new Error("The age is less than 7");
        },
      },
      errorMessage: "The age must be greater than or equal to 7",
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
      optional: true,
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
  });
};

const memberUpdate = () => {
  return checkSchema({
    cpf: {
      in: ["params"],
      custom: {
        options: (value) => validateCPF(value),
      },
      errorMessage: "CPF is invalid",
    },
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
      optional: true,
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

const cpfAndChurchName = () => {
  return checkSchema({
    cpf: {
      in: ["params"],
      custom: {
        options: (value) => validateCPF(value),
      },
      errorMessage: "CPF is invalid",
    },
    church_name: {
      in: ["query"],
      isString: true,
      custom: {
        options: (value) => validateString(value),
      },
      errorMessage: "The church_name must be a string",
    },
  });
};

module.exports = { memberCreation, memberUpdate, cpfAndChurchName };
