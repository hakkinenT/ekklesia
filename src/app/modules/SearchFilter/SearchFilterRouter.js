const { Router } = require("express");

const SearchFilterController = require("./SearchFilterController");
const authentication = require("../../middleware/authentication");

const routes = Router();

const searchFilterRouter = () => {
  routes.use(authentication);

  routes.get("/members/baptized", SearchFilterController.getAllMembersBaptized);

  routes.get(
    "/members/baptized/not",
    SearchFilterController.getAllMembersNotBaptized
  );

  routes.get(
    "/members/living/street",
    SearchFilterController.getAllMembersLivingInSameStreet
  );

  routes.get(
    "/members/living/neighborhood",
    SearchFilterController.getAllMembersLivingInSameNeighborhood
  );

  routes.get(
    "/members/baptisms",
    SearchFilterController.getAllBaptismsInATimeInterval
  );

  routes.get(
    "/members/conversions",
    SearchFilterController.getAllConversionsInATimeInterval
  );

  routes.get("/members/user", SearchFilterController.getAllMembersWithUser);

  routes.get(
    "/members/profession",
    SearchFilterController.getMembersByProfession
  );

  return routes;
};

module.exports = searchFilterRouter;
