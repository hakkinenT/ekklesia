const { User, Member } = require("../../models");
const { Op } = require("sequelize");
const checkUserPermission = require("../../../utils/validation/checkUserPermission");
const checkChurch = require("../../../utils/validation/checkChurch");
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

      const { count, rows } = await User.findAndCountAll({
        where: { permission: "admin" },
        attributes: ["id", "username", "permission"],
        includes: ["Member"],
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
      const { username, password, permission, cpf } = req.body;

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

      const user = await User.create({ username, password, permission });

      member.update({ userId: user.id });

      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const { username, permission } = req.body;

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

      const updatedUser = await user.update({ username, permission });

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
