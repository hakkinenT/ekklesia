const { User } = require("../../models");
const { Op } = require("sequelize");

class UserController {
  async show(req, res) {
    try {
      const userId = req.userId;
      const userPermission = req.userPermission;

      const id = req.params.id;

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
      const userPermission = req.userPermission;

      const permissionIsInvalid = userPermission === "comum";

      if (permissionIsInvalid) {
        return res.status(401).json({ message: "Access denied" });
      }

      const users = await User.findAll({
        where: { permission: { [Op.or]: ["admin", "comum"] } },
        attributes: ["id", "username", "permission"],
      });

      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const userPermission = req.userPermission;

      const permissionIsInvalid = userPermission === "comum";

      if (permissionIsInvalid) {
        return res.status(401).json({ message: "Access denied" });
      }

      const { username, password, permission } = req.body;

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
}

module.exports = new UserController();
