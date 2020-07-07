"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Churches_Roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      churchCnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Churches",
          key: "cnpj",
        },
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Roles",
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
    return queryInterface.dropTable("Churches_Roles");
  },
};
