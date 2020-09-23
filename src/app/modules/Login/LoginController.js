const { User, Church, Member } = require("../../../app/models");
const invalidateToken = require("../../../utils/invalidateToken");

class LoginController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const church = await Church.findOne({ where: { email } });
      const member = await Member.findOne({ where: { email } });

      const id = church ? church.user_id : member ? member.user_id : 0;

      const user = await User.findOne({ where: { id } });

      if (!user) {
        return res.status(404).json({ message: "User doesn't exists" });
      }

      const passwordIsValid = await user.validatePassword(password);

      if (!passwordIsValid) {
        return res.status(401).json({ message: "Password is invalid" });
      }

      return res.status(200).send({ user, token: user.generateToken() });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async logout(req, res) {
    const authHeader = req.headers.authorization;

    const [, token] = authHeader.split(" ");

    try {
      await invalidateToken(token);

      return res.status(200).json({ message: "Successfully logged out" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new LoginController();
