/**
 * express-validator 6.6.0
 *
 * File with the validations rules of the fields
 *
 */

const { checkSchema } = require("express-validator");
const validateString = require("./validateString");

const churchNameValidation = () => {
  return checkSchema({
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

module.exports = churchNameValidation;
