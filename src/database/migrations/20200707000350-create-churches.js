"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Churches", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      creation_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "Addresses",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Churches");
  },
};
