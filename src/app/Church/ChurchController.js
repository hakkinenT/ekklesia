const { Church, Address } = require("../models");
const { cnpj } = require("cpf-cnpj-validator");

class ChurchController {
  async store(req, res) {
    try {
      const cnpjIsValid = cnpj.isValid(req.body.cnpj);

      if (!cnpjIsValid) {
        return res.status(400).json({ message: "O CNPJ não é válido" });
      }

      const churchExists = await Church.findOne({
        where: { cnpj: req.body.cnpj },
      });

      if (churchExists) {
        return res
          .status(400)
          .json({ message: "Esta igreja já está cadastrada" });
      }

      const address = await Address.create(req.body);

      const { id } = address;

      const church = await Church.create({
        ...req.body,
        address_id: id,
      });

      return res.status(200).json(church);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new ChurchController();
