const { Church, Address, User } = require("../models");

class ChurchController {
  async show(req, res) {
    try {
      const { cnpj } = req.params;

      const church = await Church.findOne({
        where: { cnpj },
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
      const {
        name,
        cnpj,
        email,
        creation_date,
        address,
        number,
        neighborhood,
        zip_code,
        complement,
        city,
        state,
        username,
        password,
      } = req.body;

      const churchExists = await Church.findOne({
        where: { cnpj },
      });

      if (churchExists) {
        return res
          .status(400)
          .json({ message: "This church is already registered" });
      }

      const createdAddress = await Address.create({
        address,
        number,
        neighborhood,
        zip_code,
        complement,
        city,
        state,
      });

      const user = await User.create({
        username,
        password,
        permission: "super",
      });

      const church = await Church.create({
        name,
        cnpj,
        email,
        creation_date,
        address_id: createdAddress.id,
        user_id: user.id,
      });

      return res.status(200).json(church);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const {
        name,
        cnpj,
        email,
        creation_date,
        address,
        number,
        neighborhood,
        zip_code,
        complement,
        city,
        state,
      } = req.body;

      const church = await Church.findOne({
        where: { cnpj: req.params.cnpj },
      });

      if (!church) {
        return res.status(404).json({ message: "The church was not found" });
      }

      await church.update({ name, cnpj, email, creation_date });

      await Address.update(
        { address, number, neighborhood, zip_code, complement, city, state },
        {
          where: { id: church.address_id },
        }
      );

      return res.status(200).json(church);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const { cnpj } = req.params;

      const church = await Church.findOne({ where: { cnpj } });

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
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new ChurchController();
