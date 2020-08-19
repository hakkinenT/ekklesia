const { Member, Address, User } = require("../../../app/models");
const models = require("../../models/index");
const checkUserPermission = require("../../../utils/validation/checkUserPermission");
const checkChurch = require("../../../utils/validation/checkChurch");
const paginate = require("../../../utils/paginate");
const { response } = require("express");

class MemberController {
  async show(req, res) {
    try {
      const { id } = req.params;

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
          id,
          church_cnpj: cnpj,
        },
      });

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

      const { count, members } = await Member.findAndCountAll({
        where: { church_cnpj: cnpj },
        order: [["name", "ASC"]],
        ...paginate(page),
      });

      res.header("X-Total-Count", count["count(*)"]);

      return res.status(200).json(members);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const {
        name,
        genre,
        date_of_birth,
        email,
        whatsapp,
        profession,
        conversion_date,
        baptism_date,
        address,
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

      const [createdAddress] = await Address.findOrCreate({
        where: { address, number, zip_code },
        defaults: { neighborhood, complement, city, state },
      });

      const member = await models.sequelize.transaction(async (transaction) => {
        return await Member.create(
          {
            name,
            genre,
            date_of_birth,
            email,
            whatsapp,
            profession,
            conversion_date,
            baptism_date,
            church_cnpj: cnpj,
            address_id: createdAddress.id,
          },
          { transaction }
        );
      });

      return res.status(200).json(member);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { member, address } = req.body;

      const { id } = req.params;

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
          id,
          church_cnpj: cnpj,
        },
      });

      if (!foundMember) {
        return res.status(404).json({ message: "This member doesn't exists" });
      }

      const { address_id } = foundMember;

      await models.sequelize.transaction(async (transaction) => {
        if (address) {
          await Address.update(address, {
            where: { id: address_id },
            transaction,
          });
        }

        if (member) {
          await foundMember.update(member, { transaction });
        }
      });

      return res.status(200).json("Member updated with success");
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

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
          id,
          church_cnpj: cnpj,
        },
      });

      if (!member) {
        return res.status(404).json({ message: "This member doesn't exists" });
      }

      const { address_id, user_id } = member;

      await models.sequelize.transaction(async (transaction) => {
        await member.destroy({ transaction });

        const totalOfAdresses = await Address.count({
          where: { id: address_id },
        });

        const isEqualToOne = totalOfAdresses === 1;

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
