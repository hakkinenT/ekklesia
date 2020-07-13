const { Church, Address } = require("../models");
const { cnpj } = require("cpf-cnpj-validator");

class ChurchController {
  async show(req, res) {
    try {
      const cnpjIsValid = cnpj.isValid(req.params.cnpj);

      if (!cnpjIsValid) {
        return res.status(400).json({ message: "CNPJ is invalid!" });
      }

      const church = await Church.findOne({
        where: { cnpj: req.params.cnpj },
        include: ["Address"],
      });

      if (!church) {
        return res.status(404).json({ message: "The church was not found" });
      }

      return res.status(200).json(church);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const cnpjIsValid = cnpj.isValid(req.body.cnpj);

      if (!cnpjIsValid) {
        return res.status(400).json({ message: "CNPJ is invalid!" });
      }

      const churchExists = await Church.findOne({
        where: { cnpj: req.body.cnpj },
      });

      if (churchExists) {
        return res
          .status(400)
          .json({ message: "This church is already registered" });
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

  async update(req, res) {
    try {
      const cnpjIsValid = cnpj.isValid(req.params.cnpj);

      if (!cnpjIsValid) {
        return res.status(400).json({ message: "CNPJ is invalid!" });
      }

      const church = await Church.findOne({
        where: { cnpj: req.params.cnpj },
      });

      if (!church) {
        return res.status(404).json({ message: "The church was not found" });
      }

      await church.update(req.body);

      await Address.update(req.body, {
        where: { id: church.address_id },
      });

      return res.status(200).json(church);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const cnpjIsValid = cnpj.isValid(req.params.cnpj);

      if (!cnpjIsValid) {
        return res.status(400).json({ message: "CNPJ is invalid!" });
      }

      const church = await Church.findOne({ where: { cnpj: req.params.cnpj } });

      if (!church) {
        return res.status(404).json({ message: "The church was not found" });
      }

      const address = await Address.findOne({
        where: { id: church.address_id },
      });

      await church.destroy();
      await address.destroy();

      return res
        .status(200)
        .json({ message: "The church was successfully deleted!" });
    } catch (err) {}
  }
}

module.exports = new ChurchController();
