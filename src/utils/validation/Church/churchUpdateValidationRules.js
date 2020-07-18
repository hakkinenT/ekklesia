const { checkSchema } = require("express-validator");
const validateCNPJ = require("./validateCNPJ");

const churchUpdateValidationRules = () => {
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
      notEmpty: true,
      optional: true,
      errorMessage: "The name must be a string",
    },
    email: {
      isEmail: true,
      notEmpty: true,
      optional: true,
      errorMessage: "The email has an invalid format",
    },
    creation_date: {
      notEmpty: true,
      optional: true,
    },
    address: {
      isString: true,
      notEmpty: true,
      optional: true,
      errorMessage: "The address must be a string",
    },
    number: {
      isAlphanumeric: true,
      notEmpty: true,
      optional: true,
      errorMessage: "The number contains invalid characters",
    },
    neighborhood: {
      isString: true,
      notEmpty: true,
      optional: true,
      errorMessage: "The neighborhood must be a string",
    },
    zip_code: {
      isNumeric: true,
      notEmpty: true,
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
      notEmpty: true,
      optional: true,
      errorMessage: "The city must be a string",
    },

    state: {
      isString: true,
      notEmpty: true,
      optional: true,
      errorMessage: "The state must be a string",
    },
  });
};

module.exports = churchUpdateValidationRules;
