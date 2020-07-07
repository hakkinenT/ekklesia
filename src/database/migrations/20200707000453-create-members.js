"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Members", {
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
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      whatsapp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      conversionDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      baptismDate: {
        type: Sequelize.DATEONLY,
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
      addressId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Adresses",
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
    return queryInterface.dropTable("Members");
  },
};
