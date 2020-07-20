/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains only the CNPJ validation.
 * It is used to validate the CNPJ sent as a parameter to search for and delete a church.
 */

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
