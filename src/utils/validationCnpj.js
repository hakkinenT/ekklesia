const { cnpj } = require("cpf-cnpj-validator");

const validationCnpj = (CNPJ) => {
  const cnpjIsValid = cnpj.isValid(CNPJ);
  return cnpjIsValid;
};

module.exports = validationCnpj;
