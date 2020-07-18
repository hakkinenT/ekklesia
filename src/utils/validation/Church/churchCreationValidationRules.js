const { checkSchema } = require("express-validator");
const validateCNPJ = require("./validateCNPJ");

const churchCreationValidationRules = () => {
  return checkSchema({
    cnpj: {
      custom: {
        options: (value) => validateCNPJ(value),
      },
      errorMessage: "CNPJ is invalid",
    },
    name: {
      isString: true,
      notEmpty: true,
      errorMessage: "The name must be a string",
    },
    email: {
      isEmail: true,
      notEmpty: true,
      errorMessage: "The email has an invalid format",
    },
    creation_date: {
      notEmpty: true,
    },
    address: {
      isString: true,
      notEmpty: true,
      errorMessage: "The address must be a string",
    },
    number: {
      isAlphanumeric: true,
      notEmpty: true,
      errorMessage: "The number contains invalid characters",
    },
    neighborhood: {
      isString: true,
      notEmpty: true,
      errorMessage: "The neighborhood must be a string",
    },
    zip_code: {
      isNumeric: true,
      notEmpty: true,
      isLength: { options: 8 },
      errorMessage: "CEP must contain only numbers",
    },
    complement: {
      isString: true,
      errorMessage: "The complement must be a string",
      optional: true,
    },
    city: {
      isString: true,
      notEmpty: true,
      errorMessage: "The city must be a string",
    },
    state: {
      isString: true,
      notEmpty: true,
      errorMessage: "The state must be a string",
    },
    username: {
      isString: true,
      notEmpty: true,
      isLength: { options: { min: 3, max: 30 } },
      errorMessage:
        "Username must be a string with a minimum length of 3 and a maximum length of 30",
    },
    password: {
      matches: {
        options: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8}$/g,
      },
      notEmpty: true,
      errorMessage:
        "The password must consist of upper and lower case letters, numbers and special characters",
    },
  });
};

module.exports = churchCreationValidationRules;
