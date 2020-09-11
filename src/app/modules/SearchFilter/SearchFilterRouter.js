const { Router } = require("express");

const SearchFilterController = require("./SearchFilterController");
const authentication = require("../../middleware/authentication");
const churchNameValidation = require("../../../validation/churchNameValidation");
const validate = require("../../../validation/validate");

const routes = Router();

const searchFilterRouter = () => {
  routes.use(authentication);

  routes.get(
    "/members/baptized",
    churchNameValidation(),
    validate,
    SearchFilterController.getAllMembersBaptized
  );

  routes.get(
    "/members/baptized/not",
    churchNameValidation(),
    validate,
    SearchFilterController.getAllMembersNotBaptized
  );

  routes.get(
    "/members/living/street",
    churchNameValidation(),
    validate,
    SearchFilterController.getAllMembersLivingInSameStreet
  );

  routes.get(
    "/members/living/neighborhood",
    churchNameValidation(),
    validate,
    SearchFilterController.getAllMembersLivingInSameNeighborhood
  );

  routes.get(
    "/members/baptisms",
    churchNameValidation(),
    validate,
    SearchFilterController.getAllBaptismsInATimeInterval
  );

  routes.get(
    "/members/conversions",
    churchNameValidation(),
    validate,
    SearchFilterController.getAllConversionsInATimeInterval
  );

  routes.get(
    "/members/user",
    churchNameValidation(),
    validate,
    SearchFilterController.getAllMembersWithUser
  );

  routes.get(
    "/members/profession",
    churchNameValidation(),
    validate,
    SearchFilterController.getMembersByProfession
  );

  return routes;
};

module.exports = searchFilterRouter;
