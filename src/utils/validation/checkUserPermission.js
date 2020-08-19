const { User } = require("../../app/models");

const checkUserPermission = async (req, cnpj) => {
  const { userId, userPermission } = req;
  let cnpjIsEqual = null;

  const permissionIsInvalid = userPermission === "comum";

  if (permissionIsInvalid) {
    return false;
  }

  const permissionIsSuper = userPermission === "super";

  if (permissionIsSuper) {
    const user = await User.findOne({
      where: { id: userId },
      include: ["Church"],
    });

    cnpjIsEqual = user.Church.cnpj == cnpj;
  }

  const permissionIsAdmin = userPermission === "admin";

  if (permissionIsAdmin) {
    const user = await User.findOne({
      where: { id: userId },
      include: ["Member"],
    });

    cnpjIsEqual = user.Member.church_cnpj == cnpj;
  }

  if (!cnpjIsEqual) {
    return false;
  }

  return true;
};

module.exports = checkUserPermission;
