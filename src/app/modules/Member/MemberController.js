const { Member, Church, Address, User } = require("../../../app/models");
const models = require("../../models/index");

class MemberController {
  async show(req, res) {
    try {
      const userPermission = req.userPermission;
      const { church_name } = req.body;
      const { id } = req.params;

      const permissionIsInvalid = userPermission === "comum";

      if (permissionIsInvalid) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const church = await Church.findOne({ where: { name: church_name } });

      if (!church) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const { cnpj } = church;

      const member = await Member.findOne({
        where: {
          id,
          church_cnpj: cnpj,
        },
      });

      return res.status(200).json(member);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const userPermission = req.userPermission;
      const { church_name } = req.body;

      const permissionIsInvalid = userPermission === "comum";

      if (permissionIsInvalid) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const church = await Church.findOne({ where: { name: church_name } });

      if (!church) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const { cnpj } = church;

      const members = await Member.findAll({ where: { church_cnpj: cnpj } });

      return res.status(200).json(members);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const userPermission = req.userPermission;
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
        church_name,
      } = req.body;

      const permissionIsInvalid = userPermission === "comum";

      if (permissionIsInvalid) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const church = await Church.findOne({ where: { name: church_name } });

      if (!church) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const member = await models.sequelize.transaction(async (transaction) => {
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

        const createdMember = await Member.create(
          {
            name,
            genre,
            date_of_birth,
            email,
            whatsapp,
            profession,
            conversion_date,
            baptism_date,
            church_cnpj: church.cnpj,
            address_id: createdAddress.id,
          },
          { transaction }
        );

        return createdMember;
      });

      return res.status(200).json(member);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const userPermission = req.userPermission;

      const { member, address, church_name } = req.body;

      const { id } = req.params;

      const permissionIsInvalid = userPermission === "comum";

      if (permissionIsInvalid) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const church = await Church.findOne({ where: { name: church_name } });

      if (!church) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const { cnpj } = church;

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
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const userPermission = req.userPermission;
      const { church_name } = req.body;
      const { id } = req.params;

      const permissionIsInvalid = userPermission === "comum";

      if (permissionIsInvalid) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const church = await Church.findOne({ where: { name: church_name } });

      if (!church) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const { cnpj } = church;

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
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new MemberController();
