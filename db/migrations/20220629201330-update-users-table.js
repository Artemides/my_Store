'use strict';

const {UserSchema,USER_TABLE} =require('../models/user.model')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE,'password',UserSchema.password);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE,'password');
  }
};
