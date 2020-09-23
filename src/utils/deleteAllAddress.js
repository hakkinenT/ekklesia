const { Address, Member } = require("../app/models");

const deleteAllAddress = async (cnpj, transaction) => {
  try {
    const members = await Member.findAll({ where: { church_cnpj: cnpj } });

    for (let member of members) {
      const { address_id } = member;

      const address = await Address.findOne({ where: { id: address_id } });

      if (address) {
        await address.destroy({
          transaction,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = deleteAllAddress;
