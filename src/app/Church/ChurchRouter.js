const { Router } = require("express");

const ChurchController = require("./ChurchController");

const routes = Router();

const churchRouter = () => {
  routes.post("/church", ChurchController.store);

  return routes;
};

module.exports = churchRouter;
