const { Church } = require("../../src/app/models");

const checkChurch = async (req) => {
  const { church_name } = req.query;

  const church = await Church.findOne({ where: { name: church_name } });

  if (!church) {
    return null;
  }

  const { cnpj } = church;

  return cnpj;
};

module.exports = checkChurch;
