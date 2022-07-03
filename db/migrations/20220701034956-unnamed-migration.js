'use strict';

const {CATEGORY_TABLE,CategorySchema}=require('../models/category.model');
const {CUSTOMER_TABLE,CustomerSchema}=require('../models/customer.model');
const {PRODUCT_TABLE,ProductSchema}=require('../models/product.model');
const {USER_TABLE,UserSchema}=require('../models/user.model');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE,CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE,ProductSchema);
  },

  async down (queryInterface, Sequelize) {
    

  }
};
