const { Member, Address, User } = require("../../../app/models");
const models = require("../../models/index");
const checkUserPermission = require("../../../validation/checkUserPermission");
const checkChurch = require("../../../validation/checkChurch");
const paginate = require("../../../utils/paginate");

class MemberController {
  async show(req, res) {
    try {
      const { cpf } = req.params;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const member = await Member.findOne({
        where: {
          cpf,
          church_cnpj: cnpj,
        },
        include: ["Address"],
      });

      if (!member) {
        return res.status(404).json({ message: "This member doesn't exists" });
      }

      return res.status(200).json(member);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const { page = 1 } = req.query;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const { count, rows } = await Member.findAndCountAll({
        where: { church_cnpj: cnpj },
        order: [["name", "ASC"]],
        include: ["Address"],
        ...paginate(page),
      });

      res.header("X-Total-Count", count);

      return res.status(200).json(rows);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const {
        name,
        cpf,
        genre,
        age,
        date_of_birth,
        email,
        whatsapp,
        profession,
        conversion_date,
        baptism_date,
        street,
        number,
        neighborhood,
        zip_code,
        complement,
        city,
        state,
      } = req.body;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const [address] = await Address.findOrCreate({
        where: { street, number, zip_code },
        defaults: { neighborhood, complement, city, state },
      });

      const member = await models.sequelize.transaction(async (transaction) => {
        return await Member.create(
          {
            name,
            cpf,
            genre,
            age,
            date_of_birth,
            email,
            whatsapp,
            profession,
            conversion_date,
            baptism_date,
            church_cnpj: cnpj,
            address_id: address.id,
          },
          { transaction }
        );
      });

      return res.status(201).json(member);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { member, address } = req.body;

      const { cpf } = req.params;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const foundMember = await Member.findOne({
        where: {
          cpf,
          church_cnpj: cnpj,
        },
      });

      if (!foundMember) {
        return res.status(404).json({ message: "This member doesn't exists" });
      }

      const { address_id } = foundMember;

      const updatedMember = await models.sequelize.transaction(
        async (transaction) => {
          let updateMember = null;

          if (address) {
            await Address.update(address, {
              where: { id: address_id },
              transaction,
            });
          }

          if (member) {
            updateMember = await foundMember.update(member, { transaction });
          }

          return updateMember;
        }
      );

      return res.status(200).json(updatedMember);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const { cpf } = req.params;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const member = await Member.findOne({
        where: {
          cpf,
          church_cnpj: cnpj,
        },
      });

      if (!member) {
        return res.status(404).json({ message: "This member doesn't exists" });
      }

      const { address_id, user_id } = member;

      await models.sequelize.transaction(async (transaction) => {
        const membersWithSameAddress = await Member.count({
          where: { address_id },
        });

        await member.destroy({ transaction });

        const isEqualToOne = membersWithSameAddress === 1;

        if (isEqualToOne) {
          await Address.destroy({ where: { id: address_id }, transaction });
        }

        if (user_id) {
          await User.destroy({ where: { id: user_id }, transaction });
        }
      });

      return res
        .status(200)
        .json({ message: "The member was successfully deleted!" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new MemberController();
