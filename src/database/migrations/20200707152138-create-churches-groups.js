"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Churches_Groups", {
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
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Groups",
          key: "id",
        },
      },
      amountOfPeople: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable("Churches_Groups");
  },
};
