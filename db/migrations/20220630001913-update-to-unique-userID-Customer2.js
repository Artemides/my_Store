'use strict';
const {CUSTOMER_TABLE,CustomerSchema} = require('../models/customer.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    delete CustomerSchema.userID.references;
    await queryInterface.changeColumn(CUSTOMER_TABLE,'user_id',CustomerSchema.userID);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
