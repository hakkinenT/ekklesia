"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      memberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Members",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Roles");
  },
};
