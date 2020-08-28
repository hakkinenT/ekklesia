const { cnpj, cpf } = require("cpf-cnpj-validator");

const validateCNPJ = (CNPJ) => {
  const cnpjIsValid = cnpj.isValid(CNPJ);

  if (!cnpjIsValid) {
    throw new Error("CNPJ is invalid!");
  }

  return CNPJ;
};

const validateCPF = (CPF) => {
  const cpfIsValid = cpf.isValid(CPF);

  if (!cpfIsValid) {
    throw new Error("CPF is invalid");
  }
};

module.exports = { validateCNPJ, validateCPF };
