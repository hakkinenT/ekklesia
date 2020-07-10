const { Router } = require("express");

const ChurchController = require("./ChurchController");

const routes = Router();

const churchRouter = () => {
  routes.post("/church", ChurchController.store);
  routes.get("/church/:cnpj", ChurchController.show);
  routes.put("/church/:cnpj", ChurchController.update);

  return routes;
};

module.exports = churchRouter;
