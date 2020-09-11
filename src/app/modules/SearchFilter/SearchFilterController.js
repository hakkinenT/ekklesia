const { Member, Address, User } = require("../../../app/models");
const checkUserPermission = require("../../../validation/checkUserPermission");
const checkChurch = require("../../../validation/checkChurch");
const paginate = require("../../../utils/paginate");
const { Op } = require("sequelize");

class SearchFilterController {
  async getAllMembersBaptized(req, res) {
    try {
      const { page = 1 } = req.query;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const { count, rows: members } = await Member.findAndCountAll({
        where: { church_cnpj: cnpj, baptism_date: { [Op.ne]: null } },
        order: [["name", "ASC"]],
        ...paginate(page),
      });

      res.header("X-Total-Count", count);

      return res.status(200).json({ members });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getAllMembersNotBaptized(req, res) {
    try {
      const { page = 1 } = req.query;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const { count, rows: members } = await Member.findAndCountAll({
        where: { church_cnpj: cnpj, baptism_date: { [Op.is]: null } },
        order: [["name", "ASC"]],
        ...paginate(page),
      });

      res.header("X-Total-Count", count);

      return res.status(200).json({ members });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getAllMembersLivingInSameStreet(req, res) {
    try {
      const { page = 1, street } = req.query;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const { count, rows: members } = await Member.findAndCountAll({
        where: { church_cnpj: cnpj },
        include: [
          {
            model: Address,
            as: "Address",
            where: {
              street,
            },
          },
        ],
        order: [["name", "ASC"]],
        ...paginate(page),
      });

      res.header("X-Total-Count", count);

      return res.status(200).json({ members });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getAllMembersLivingInSameNeighborhood(req, res) {
    try {
      const { page = 1, neighborhood } = req.query;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const { count, rows: members } = await Member.findAndCountAll({
        where: { church_cnpj: cnpj },
        include: [
          {
            model: Address,
            as: "Address",
            where: {
              neighborhood,
            },
          },
        ],
        order: [["name", "ASC"]],
        ...paginate(page),
      });

      res.header("X-Total-Count", count);

      return res.status(200).json({ members });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getAllBaptismsInATimeInterval(req, res) {
    try {
      const { page = 1, init, end } = req.query;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const { count, rows: members } = await Member.findAndCountAll({
        where: {
          church_cnpj: cnpj,
          baptism_date: {
            [Op.gte]: init,
            [Op.lte]: end,
          },
        },
        order: [["baptism_date", "ASC"]],
        ...paginate(page),
      });

      res.header("X-Total-Count", count);

      return res.status(200).json({ members });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getAllConversionsInATimeInterval(req, res) {
    try {
      const { page = 1, init, end } = req.query;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const { count, rows: members } = await Member.findAndCountAll({
        where: {
          church_cnpj: cnpj,
          conversion_date: {
            [Op.gte]: init,
            [Op.lte]: end,
          },
        },
        order: [["conversion_date", "ASC"]],
        ...paginate(page),
      });

      res.header("X-Total-Count", count);

      return res.status(200).json({ members });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getAllMembersWithUser(req, res) {
    try {
      const { page = 1 } = req.query;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const { count, rows: members } = await Member.findAndCountAll({
        where: {
          church_cnpj: cnpj,
          user_id: { [Op.ne]: null },
        },
        include: [
          {
            model: User,
            as: "User",
            attributes: [
              "id",
              "username",
              "permission",
              "createdAt",
              "updatedAt",
            ],
          },
        ],
        order: [["name", "ASC"]],

        ...paginate(page),
      });

      res.header("X-Total-Count", count);

      return res.status(200).json({ members });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getMembersByProfession(req, res) {
    try {
      const { page = 1, profession } = req.query;

      const cnpj = await checkChurch(req);

      if (!cnpj) {
        return res.status(404).json({ message: "This church doesn't exists" });
      }

      const userHasPermission = await checkUserPermission(req, cnpj);

      if (!userHasPermission) {
        return res.status(401).json({ message: "Access denied!" });
      }

      const { count, rows: members } = await Member.findAndCountAll({
        where: {
          church_cnpj: cnpj,
          profession,
        },
        order: [["profession", "ASC"]],

        ...paginate(page),
      });

      res.header("X-Total-Count", count);

      return res.status(200).json({ members });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new SearchFilterController();
