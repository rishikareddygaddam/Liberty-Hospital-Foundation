"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Grants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      agency: {
        type: Sequelize.STRING
      },
      primary: {
        type: Sequelize.STRING
      },
      tax_id: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      person_title: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      fax: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      info: {
        type: Sequelize.STRING
      },
      docs: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      new_or_current: {
        type: Sequelize.BOOLEAN
      },
      funding_past: {
        type: Sequelize.STRING
      },
      synopsis: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      },
      outcomes: {
        type: Sequelize.STRING
      },
      collaborative: {
        type: Sequelize.STRING
      },
      sources: {
        type: Sequelize.STRING
      },
      sustainability: {
        type: Sequelize.STRING
      },
      no_of_people: {
        type: Sequelize.INTEGER
      },
      socio: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      clients: {
        type: Sequelize.STRING
      },
      budget: {
        type: Sequelize.STRING
      },
      head: {
        type: Sequelize.STRING
      },
      head_title: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Grants");
  }
};
