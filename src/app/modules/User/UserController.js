const { User, Member } = require("../../models");
const checkUserPermission = require("../../validators/checkUserPermission");
const checkChurch = require("../../validators/checkChurch");
const createUsername = require("../../../utils/createUsername");
const paginate = require("../../../utils/paginate");

class UserController {
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

      const user = await User.findOne({
        where: { id },
        attributes: ["id", "username", "permission"],
        include: [{ as: "Member", model: Member }],
      });

      if (!user) {
        return res.status(404).json({ message: "The user doesn't exists" });
      }

      return res.status(200).json(user);
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

      const { count, rows: users } = await User.findAndCountAll({
        where: { permission: "admin" },
        attributes: ["id", "username", "permission"],
        include: [{ as: "Member", model: Member }],
        ...paginate(page),
      });

      res.header("X-Total-Count", count);

      return res.status(200).json({ users });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      /**
       * O campo permission ainda é passado no campo da requisição mesmo ele tendo como default
       * o valor admin. Isso, porque futuramente, será adicionado um novo tipo de permissão.
       */
      const { password, permission, cpf } = req.body;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const member = await Member.findOne({ where: { cpf } });

      if (!member) {
        return res.status(404).json({ message: "This member doesn't exists" });
      }

      const memberHasUser = member.userId;

      if (memberHasUser) {
        return res
          .status(403)
          .json({ message: "That member already has a registered user" });
      }

      const memberHasEmail = member.email;

      if (!memberHasEmail) {
        return res
          .status(403)
          .json({ message: "The member must have an email" });
      }
      const { name } = member;
      let username = createUsername(name);
      const user = await User.create({ username, password, permission });

      member.update({ user_id: user.id });

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      let updatedUser = null;

      const { id } = req.params;

      const { user } = req.body;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const foundUser = await User.findOne({ where: { id } });

      if (!foundUser) {
        return res.status(404).json({ message: "The user doesn't exists" });
      }

      if (!user) {
        return res.status(400).json({
          message: "It is necessary to inform some user data to update",
        });
      }

      updatedUser = await foundUser.update(user);

      return res.status(200).send(updatedUser);
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

      const user = await User.findOne({ where: { id } });

      if (!user) {
        return res.status(404).json({ message: "The user doesn't exists" });
      }

      await user.destroy();

      return res
        .status(200)
        .json({ message: "The user was successfully deleted!" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new UserController();
