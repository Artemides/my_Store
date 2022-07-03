'use strict';
const { CUSTOMER_TABLE, CustomerSchema }=require('../models/customer.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CUSTOMER_TABLE,'updated_at',CustomerSchema.updatedAt)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(CUSTOMER_TABLE,'updated_at')
  }
};
