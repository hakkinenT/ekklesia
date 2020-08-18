const { Router } = require("express");

const MemberController = require("./MemberController");
const memberCreationValidationRules = require("../../../utils/validation/Member/memberCreationValidationRules");
const memberUpdateValidationRules = require("../../../utils/validation/Member/memberUpdateValidationRules");
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

  routes.get("/members", MemberController.index);
  routes.get("/member/:id", MemberController.show);
  routes.put(
    "/member/:id",
    memberUpdateValidationRules(),
    validate,
    MemberController.update
  );
  routes.delete("/member/:id", MemberController.destroy);

  return routes;
};

module.exports = memberRouter;
