const { Church, Address, User, Member } = require("../../models");
const models = require("../../models/index");
const {
  checkUserPermission,
} = require("../../validators/validateUserPermission");

const createUsername = require("../../../utils/createUsername");
const {
  churchAlreadyExist,
  churchEmailAlreadyExist,
} = require("../../validators/validatePKAndUniqueKey");
const deleteAllAddress = require("../../../utils/deleteAllAddress");

class ChurchController {
  async show(req, res) {
    try {
      const { cnpj } = req.params;

      const userHasPermission = await checkUserPermission(req, cnpj, "church");

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const church = await Church.findOne({
        where: { cnpj },
        include: ["Address"],
      });

      if (!church) {
        return res.status(404).json({ message: "The church was not found" });
      }

      return res.status(200).json(church);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const {
        name,
        cnpj,
        email,
        creation_date,
        street,
        number,
        neighborhood,
        zip_code,
        complement,
        city,
        state,
        password,
      } = req.body;

      const churchExists = await churchAlreadyExist(cnpj);

      if (churchExists) {
        return res
          .status(400)
          .json({ message: "This church is already registered" });
      }

      const emailExists = await churchEmailAlreadyExist(email);
      if (emailExists) {
        return res
          .status(400)
          .json({ message: "This email is already registered" });
      }

      const church = await models.sequelize.transaction(async (transaction) => {
        const address = await Address.create(
          {
            street,
            number,
            neighborhood,
            zip_code,
            complement,
            city,
            state,
          },
          { transaction }
        );

        let username = createUsername(name, "church");

        const user = await User.create(
          {
            username,
            password,
            permission: "super",
          },
          { transaction }
        );

        const createChurch = await Church.create(
          {
            name,
            cnpj,
            email,
            creation_date,
            address_id: address.id,
            user_id: user.id,
          },
          { transaction }
        );

        return createChurch;
      });

      return res.status(201).json(church);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { church, address } = req.body;

      const { cnpj } = req.params;

      const foundChurch = await Church.findOne({
        where: { cnpj },
      });

      if (!foundChurch) {
        return res.status(404).json({ message: "The church was not found" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj, "church");

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const { address_id } = foundChurch;

      const updatedChurch = await models.sequelize.transaction(
        async (transaction) => {
          let updateChurch = null;

          if (address) {
            await Address.update(address, {
              where: { id: address_id },
              transaction,
            });
          }

          if (church) {
            updateChurch = await foundChurch.update(church, { transaction });
          }

          return updateChurch;
        }
      );

      return res.status(200).json(updatedChurch);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const { cnpj } = req.params;

      const church = await Church.findOne({ where: { cnpj } });

      if (!church) {
        return res.status(404).json({ message: "The church was not found" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj, "church");

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      await models.sequelize.transaction(async (transaction) => {
        await deleteAllAddress(cnpj, transaction);

        await Address.destroy({
          where: { id: church.address_id },
          transaction,
        });

        await User.destroy({
          where: { id: church.user_id },
          transaction,
        });

        await church.destroy({ transaction });
      });

      return res
        .status(200)
        .json({ message: "The church was successfully deleted!" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new ChurchController();
