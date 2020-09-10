const { Router } = require("express");
const UserController = require("./UserController");

const userCreationValidation = require("../../../validation/User/userCreationValidation");
const userUpdateValidation = require("../../../validation/User/userUpdateValidation");
const churchNameValidation = require("../../../validation/churchNameValidation");
const validate = require("../../../validation/validate");
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

  routes.get(
    "/user/:id",
    churchNameValidation(),
    validate,
    UserController.show
  );

  routes.get("/users", churchNameValidation(), validate, UserController.index);

  routes.put(
    "/user/:id",
    userUpdateValidation(),
    validate,
    UserController.update
  );

  routes.delete(
    "/user/:id",
    churchNameValidation(),
    validate,
    UserController.destroy
  );

  return routes;
};

module.exports = userRouter;
