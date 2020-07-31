const { Router } = require("express");
const UserController = require("./UserController");

const userCreationValidationRules = require("../../../utils/validation/User/userCreationValidationRules");
const userUpdateValidationRules = require("../../../utils/validation/User/userUpdateValidationRules");
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

  routes.get("/user/:id", UserController.show);

  routes.get("/user", UserController.index);

  routes.put(
    "/user/:id",
    userUpdateValidationRules(),
    validate,
    UserController.update
  );

  routes.delete("/user/:id", UserController.destroy);

  return routes;
};

module.exports = userRouter;
