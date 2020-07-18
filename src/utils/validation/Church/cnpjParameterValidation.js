const { checkSchema } = require("express-validator");
const validateCNPJ = require("./validateCNPJ");

const cnpjParameterValidation = () => {
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

module.exports = cnpjParameterValidation;
