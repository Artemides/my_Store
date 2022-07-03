'use strict';

const { ProductSchema, PRODUCT_TABLE } = require("../models/product.model");
const { UserSchema, USER_TABLE } = require("../models/user.model");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(PRODUCT_TABLE,ProductSchema);
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
