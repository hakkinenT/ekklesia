const { cnpj } = require("cpf-cnpj-validator");

const validateCNPJ = (CNPJ) => {
  const cnpjIsValid = cnpj.isValid(CNPJ);

  if (!cnpjIsValid) {
    throw new Error("CNPJ is invalid!");
  }

  return CNPJ;
};

module.exports = validateCNPJ;
