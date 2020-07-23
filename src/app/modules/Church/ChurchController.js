const { Church, Address, User } = require("../../models");
const models = require("../../models/index");

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

      const createdChurch = await models.sequelize.transaction(
        async (transaction) => {
          const createdAddress = await Address.create(
            {
              address,
              number,
              neighborhood,
              zip_code,
              complement,
              city,
              state,
            },
            { transaction }
          );

          const user = await User.create(
            {
              username,
              password,
              permission: "super",
            },
            { transaction }
          );

          const church = await Church.create(
            {
              name,
              cnpj,
              email,
              creation_date,
              address_id: createdAddress.id,
              user_id: user.id,
            },
            { transaction }
          );

          return church;
        }
      );

      return res.status(200).json(createdChurch);
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

      const updatedChurch = await models.sequelize.transaction(
        async (transaction) => {
          const churchUpdate = await church.update(
            { name, cnpj, email, creation_date },
            { transaction }
          );

          await Address.update(
            {
              address,
              number,
              neighborhood,
              zip_code,
              complement,
              city,
              state,
            },
            {
              where: { id: church.address_id },
              transaction,
            }
          );

          return churchUpdate;
        }
      );

      return res.status(200).json(updatedChurch);
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

      await models.sequelize.transaction(async (transaction) => {
        await church.destroy({ transaction });
        await Address.destroy({
          where: { id: church.address_id },
          transaction,
        });
        await User.destroy({
          where: { id: church.user_id },
          transaction,
        });
      });

      return res
        .status(200)
        .json({ message: "The church was successfully deleted!" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new ChurchController();
