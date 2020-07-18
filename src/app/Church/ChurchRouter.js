const { Router } = require("express");

const churchCreationValidationRules = require("../../utils/validation/Church/churchCreationValidationRules");
const churchUpdateValidationRules = require("../../utils/validation/Church/churchUpdateValidationRules");
const cnpjParameterValidation = require("../../utils/validation/Church/cnpjParameterValidation");

const validate = require("../../utils/validation/validate");

const ChurchController = require("./ChurchController");

const routes = Router();

const churchRouter = () => {
  routes.post(
    "/church",
    churchCreationValidationRules(),
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
    churchUpdateValidationRules(),
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
