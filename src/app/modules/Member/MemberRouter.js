const { Router } = require("express");

const MemberController = require("./MemberController");
const {
  memberCreation,
  memberUpdate,
  cpfAndChurchName,
} = require("../../validators/Member/member");
const churchNameValidation = require("../../validators/churchNameValidation");
const validate = require("../../validators/validate");

const authentication = require("../../middleware/authentication");

const routes = Router();

const memberRouter = () => {
  routes.use(authentication);

  routes.post("/member", memberCreation(), validate, MemberController.store);

  routes.get(
    "/members",
    churchNameValidation(),
    validate,
    MemberController.index
  );

  routes.get(
    "/member/:cpf",
    cpfAndChurchName(),
    validate,
    MemberController.show
  );

  routes.put("/member/:cpf", memberUpdate(), validate, MemberController.update);

  routes.delete(
    "/member/:cpf",
    cpfAndChurchName(),
    validate,
    MemberController.destroy
  );

  return routes;
};

module.exports = memberRouter;
