const { Router } = require("express");
const UserController = require("./UserController");

const userCreationValidationRules = require("../../../utils/validation/User/userCreationValidationRules");
const validate = require("../../../utils/validation/validate");
const authentication = require("../../middleware/authentication");

const routes = Router();

const userRouter = () => {
  routes.use(authentication);

  routes.post(
    "/user",
    userCreationValidationRules(),
    validate,
    UserController.store
  );

  return routes;
};

module.exports = userRouter;
