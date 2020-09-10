const { Router } = require("express");

const MemberController = require("./MemberController");
const memberCreationValidation = require("../../../validation/Member/memberCreationValidation");
const memberUpdateValidation = require("../../../validation/Member/memberUpdateValidation");
const churchNameValidation = require("../../../validation/churchNameValidation");
const cpfAndChurchNameValidation = require("../../../validation/Member/cpfAndChurchNameValidation");
const validate = require("../../../validation/validate");

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
    "/member/:cpf",
    cpfAndChurchNameValidation(),
    validate,
    MemberController.show
  );

  routes.put(
    "/member/:cpf",
    memberUpdateValidation(),
    validate,
    MemberController.update
  );

  routes.delete(
    "/member/:cpf",
    cpfAndChurchNameValidation(),
    validate,
    MemberController.destroy
  );

  return routes;
};

module.exports = memberRouter;
