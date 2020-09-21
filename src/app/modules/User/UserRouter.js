const { Router } = require("express");
const UserController = require("./UserController");

const { userCreation, userUpdate } = require("../../validators/User/user");
const churchNameValidation = require("../../validators/churchNameValidation");
const validate = require("../../validators/validate");
const authentication = require("../../middleware/authentication");

const routes = Router();

const userRouter = () => {
  routes.use(authentication);

  routes.post("/user", userCreation(), validate, UserController.store);

  routes.get(
    "/user/:id",
    churchNameValidation(),
    validate,
    UserController.show
  );

  routes.get("/users", churchNameValidation(), validate, UserController.index);

  routes.put("/user/:id", userUpdate(), validate, UserController.update);

  routes.delete(
    "/user/:id",
    churchNameValidation(),
    validate,
    UserController.destroy
  );

  return routes;
};

module.exports = userRouter;
