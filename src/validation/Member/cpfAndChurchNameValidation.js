/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 * This file contains the CPF and Church name validation.
 * It is used to validate the CPF sent as a parameter to search for and delete a member. And to validate
 * the church name sent in the query
 */

const { checkSchema } = require("express-validator");
const validateString = require("../validateString");
const { validateCPF } = require("../validate_CPF_CNPJ");

const cpfAndChurchNameValidation = () => {
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

module.exports = cpfAndChurchNameValidation;
