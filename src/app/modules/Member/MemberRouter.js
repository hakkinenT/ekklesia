const { Router } = require("express");

const MemberController = require("./MemberController");
const memberCreationValidation = require("../../../utils/validation/Member/memberCreationValidation");
const memberUpdateValidation = require("../../../utils/validation/Member/memberUpdateValidation");
const churchNameValidation = require("../../../utils/validation/churchNameValidation");
const validate = require("../../../utils/validation/validate");

const authentication = require("../../middleware/authentication");

const routes = Router();

const memberRouter = () => {
  routes.use(authentication);

  routes.post(
    "/member",
    memberCreationValidation(),
    validate,
    MemberController.store
  );

  routes.get(
    "/members",
    churchNameValidation(),
    validate,
    MemberController.index
  );

  routes.get(
    "/member/:id",
    churchNameValidation(),
    validate,
    MemberController.show
  );

  routes.put(
    "/member/:id",
    memberUpdateValidation(),
    validate,
    MemberController.update
  );

  routes.delete(
    "/member/:id",
    churchNameValidation(),
    validate,
    MemberController.destroy
  );

  return routes;
};

module.exports = memberRouter;
