const { Member, Church } = require("../../app/models");

const memberAlreadyExist = async (cpf) => {
  const member = await Member.findOne({ where: { cpf } });

  const memberExists = member ? true : false;

  return memberExists;
};

const churchAlreadyExist = async (cnpj) => {
  const church = await Church.findOne({ where: { cnpj } });

  const churchExists = church ? true : false;

  return churchExists;
};

const churchEmailAlreadyExist = async (email) => {
  const church = await Church.findOne({ where: { email } });
  let emailExists = false;

  if (church) {
    emailExists = church.email ? true : false;
  }

  return emailExists;
};

const memberEmailAlreadyExist = async (email) => {
  const member = await Member.findOne({ where: { email } });
  let emailExists = false;

  if (member) {
    emailExists = member.email ? true : false;
  }

  return emailExists;
};

module.exports = {
  memberAlreadyExist,
  churchAlreadyExist,
  churchEmailAlreadyExist,
  memberEmailAlreadyExist,
};
