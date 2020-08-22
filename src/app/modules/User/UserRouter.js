const { Router } = require("express");
const UserController = require("./UserController");

const userCreationValidation = require("../../../utils/validation/User/userCreationValidation");
const userUpdateValidation = require("../../../utils/validation/User/userUpdateValidation");
const validate = require("../../../utils/validation/validate");
const authentication = require("../../middleware/authentication");

const routes = Router();

const userRouter = () => {
  routes.use(authentication);

  routes.post(
    "/user",
    userCreationValidation(),
    validate,
    UserController.store
  );

  routes.get("/user/:id", UserController.show);

  routes.get("/user", UserController.index);

  routes.put(
    "/user/:id",
    userUpdateValidation(),
    validate,
    UserController.update
  );

  routes.delete("/user/:id", UserController.destroy);

  return routes;
};

module.exports = userRouter;
