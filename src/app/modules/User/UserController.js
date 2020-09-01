const { User } = require("../../models");
const { Op } = require("sequelize");
const checkUserPermission = require("../../../utils/validation/checkUserPermission");
const checkChurch = require("../../../utils/validation/checkChurch");
const paginate = require("../../../utils/paginate");

class UserController {
  async show(req, res) {
    try {
      const userId = req.userId;
      const userPermission = req.userPermission;

      const { id } = req.params;

      const permissionIsCommon = userPermission === "comum";

      if (permissionIsCommon) {
        const idsAreEquals = userId == id;

        if (!idsAreEquals) {
          return res.status(401).json({ message: "Access denied" });
        }
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
      return res.status(400).json({ error: err.message });
    }
  }

  async index(req, res) {
    try {
      const { page = 1 } = req.query;

      const userPermission = req.userPermission;

      const permissionIsInvalid = userPermission === "comum";

      if (permissionIsInvalid) {
        return res.status(401).json({ message: "Access denied" });
      }

      const { count, rows } = await User.findAndCountAll({
        where: { permission: { [Op.or]: ["admin", "comum"] } },
        attributes: ["id", "username", "permission"],
        ...paginate(page),
      });

      res.header("X-Total-Count", count);

      return res.status(200).json(rows);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const { username, password, permission } = req.body;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const [user, userCreated] = await User.findOrCreate({
        where: { username },
        defaults: { password, permission },
      });

      if (!userCreated) {
        return res
          .status(400)
          .json({ message: "This username already exists" });
      }

      return res.status(200).send(user);
    } catch (err) {
      return res.status(400).send({ error: err.message });
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
      return res.status(400).json({ error: err.message });
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
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new UserController();
