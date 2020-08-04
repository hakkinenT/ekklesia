const { Router } = require("express");

const routes = Router();

const LoginController = require("./LoginController.js");

const loginRouter = () => {
  routes.post("/login", LoginController.login);

  return routes;
};

module.exports = loginRouter;
