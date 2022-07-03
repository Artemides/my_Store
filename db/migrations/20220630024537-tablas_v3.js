'use strict';
const {CUSTOMER_TABLE,CustomerSchema}=require('../models/customer.model');
const {PRODUCT_TABLE,ProductSchema}=require('../models/product.model');
const {USER_TABLE,UserSchema}=require('../models/user.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(PRODUCT_TABLE,ProductSchema);
    await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema);
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
