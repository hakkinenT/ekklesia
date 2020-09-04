const { Router } = require("express");

const churchCreationValidation = require("../../../validation/Church/churchCreationValidation");
const churchUpdateValidation = require("../../../validation/Church/churchUpdateValidation");
const cnpjParameterValidation = require("../../../validation/Church/cnpjParameterValidation");
const validate = require("../../../validation/validate");

const authentication = require("../../middleware/authentication");

const ChurchController = require("./ChurchController");

const routes = Router();

const churchRouter = () => {
  routes.post(
    "/church",
    churchCreationValidation(),
    validate,
    ChurchController.store
  );

  routes.use(authentication);

  routes.get(
    "/church/:cnpj",
    cnpjParameterValidation(),
    validate,
    ChurchController.show
  );

  routes.put(
    "/church/:cnpj",
    churchUpdateValidation(),
    validate,
    ChurchController.update
  );

  routes.delete(
    "/church/:cnpj",
    cnpjParameterValidation(),
    validate,
    ChurchController.destroy
  );

  return routes;
};

module.exports = churchRouter;
