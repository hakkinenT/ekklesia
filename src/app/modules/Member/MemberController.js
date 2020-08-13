const { Member, Church, Address } = require("../../../app/models");
const models = require("../../models/index");

class MemberController {
  async store(req, res) {
    try {
      const userPermission = req.userPermission;

      const permissionIsInvalid = userPermission === "comum";

      if (permissionIsInvalid) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const {
        name,
        genre,
        date_of_birth,
        email,
        whatsapp,
        profession,
        conversion_date,
        baptism_date,
        address,
        number,
        neighborhood,
        zip_code,
        complement,
        city,
        state,
        church_name,
      } = req.body;

      const church = await Church.findOne({ where: { name: church_name } });

      if (!church) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const member = await models.sequelize.transaction(async (transaction) => {
        const createdAddress = await Address.create(
          {
            address,
            number,
            neighborhood,
            zip_code,
            complement,
            city,
            state,
          },
          { transaction }
        );

        const createdMember = await Member.create(
          {
            name,
            genre,
            date_of_birth,
            email,
            whatsapp,
            profession,
            conversion_date,
            baptism_date,
            church_cnpj: church.cnpj,
            address_id: createdAddress.id,
          },
          { transaction }
        );

        return createdMember;
      });

      return res.status(200).json(member);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new MemberController();
