const { Router } = require("express");

const {
  churchCreation,
  churchUpdate,
  cnpjParameter,
} = require("../../validators/Church/church");

const validate = require("../../validators/validate");

const authentication = require("../../middleware/authentication");

const ChurchController = require("./ChurchController");

const routes = Router();

const churchRouter = () => {
  routes.post("/church", churchCreation(), validate, ChurchController.store);

  routes.use(authentication);

  routes.get("/church/:cnpj", cnpjParameter(), validate, ChurchController.show);

  routes.put(
    "/church/:cnpj",
    churchUpdate(),
    validate,
    ChurchController.update
  );

  routes.delete(
    "/church/:cnpj",
    cnpjParameter(),
    validate,
    ChurchController.destroy
  );

  return routes;
};

module.exports = churchRouter;
