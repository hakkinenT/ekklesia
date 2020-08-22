const { Router } = require("express");

const churchCreationValidation = require("../../../utils/validation/Church/churchCreationValidation");
const churchUpdateValidation = require("../../../utils/validation/Church/churchUpdateValidation");
const cnpjParameterValidation = require("../../../utils/validation/Church/cnpjParameterValidation");

const validate = require("../../../utils/validation/validate");

const ChurchController = require("./ChurchController");

const routes = Router();

const churchRouter = () => {
  routes.post(
    "/church",
    churchCreationValidation(),
    validate,
    ChurchController.store
  );

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
