'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Scholarships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zip: {
        type: Sequelize.STRING
      },
      home_phone: {
        type: Sequelize.STRING
      },
      cell: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      learn: {
        type: Sequelize.STRING
      },
      is_relatives: {
        type: Sequelize.BOOLEAN
      },
      guardian1_name: {
        type: Sequelize.STRING
      },
      guardian1_street: {
        type: Sequelize.STRING
      },
      guardian1_city: {
        type: Sequelize.STRING
      },
      guardian1_zip: {
        type: Sequelize.STRING
      },
      guardian1_occupation: {
        type: Sequelize.STRING
      },
      guardian2_name: {
        type: Sequelize.STRING
      },
      guardian2_street: {
        type: Sequelize.STRING
      },
      guardian2_city: {
        type: Sequelize.STRING
      },
      guardian2_zip: {
        type: Sequelize.STRING
      },
      guardian2_occupation: {
        type: Sequelize.STRING
      },
      no_of_siblings: {
        type: Sequelize.INTEGER
      },
      no_in_college: {
        type: Sequelize.INTEGER
      },
      k12: {
        type: Sequelize.STRING
      },
      live_with_parents: {
        type: Sequelize.STRING
      },
      explain_living: {
        type: Sequelize.STRING
      },
      years_on_job: {
        type: Sequelize.INTEGER
      },
      place_employment: {
        type: Sequelize.STRING
      },
      plan_to_work: {
        type: Sequelize.BOOLEAN
      },
      hours_week: {
        type: Sequelize.INTEGER
      },
      school: {
        type: Sequelize.STRING
      },
      school_address: {
        type: Sequelize.STRING
      },
      school_year: {
        type: Sequelize.INTEGER
      },
      class_rank: {
        type: Sequelize.INTEGER
      },
      gpa: {
        type: Sequelize.FLOAT
      },
      weighted_gpa: {
        type: Sequelize.FLOAT
      },
      act: {
        type: Sequelize.INTEGER
      },
      english: {
        type: Sequelize.INTEGER
      },
      science: {
        type: Sequelize.INTEGER
      },
      math: {
        type: Sequelize.INTEGER
      },
      reading: {
        type: Sequelize.INTEGER
      },
      composite: {
        type: Sequelize.INTEGER
      },
      other_scores: {
        type: Sequelize.STRING
      },
      counselor: {
        type: Sequelize.STRING
      },
      counselor_phone: {
        type: Sequelize.STRING
      },
      colleges_applied: {
        type: Sequelize.STRING
      },
      college_planned: {
        type: Sequelize.STRING
      },
      accepted_nursing: {
        type: Sequelize.STRING
      },
      when_apply: {
        type: Sequelize.INTEGER
      },
      field_of_interest: {
        type: Sequelize.STRING
      },
      graduate_month: {
        type: Sequelize.INTEGER
      },
      graduate_year: {
        type: Sequelize.INTEGER
      },
      college_classes_taken: {
        type: Sequelize.STRING
      },
      college_awarded: {
        type: Sequelize.STRING
      },
      transcripts: {
        type: Sequelize.BOOLEAN
      },
      acceptance: {
        type: Sequelize.BOOLEAN
      },
      statement: {
        type: Sequelize.BOOLEAN
      },
      recommendation: {
        type: Sequelize.BOOLEAN
      },
      transcripts_file: {
        type: Sequelize.STRING
      },
      acceptance_file: {
        type: Sequelize.STRING
      },
      statement_file: {
        type: Sequelize.STRING
      },
      recommendation_file: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Scholarships');
  }
};