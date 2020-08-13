const { Router } = require("express");

const MemberController = require("./MemberController");
const memberCreationValidationRules = require("../../../utils/validation/Member/memberCreationValidationRules");
//const memberUpdateValidationRules = require("../../../utils/validation/Member/memberUpdateValidationRules");
const validate = require("../../../utils/validation/validate");

const authentication = require("../../middleware/authentication");

const routes = Router();

const memberRouter = () => {
  routes.use(authentication);

  routes.post(
    "/member",
    memberCreationValidationRules(),
    validate,
    MemberController.store
  );

  return routes;
};

module.exports = memberRouter;
