const { User } = require("../../models");

class UserController {
  async store(req, res) {
    try {
      const userPermission = req.userPermission;

      const permissionIsValid =
        userPermission === "super" || userPermission === "admin";

      if (!permissionIsValid) {
        return res.status(401).json({ message: "Acesso Negado" });
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
