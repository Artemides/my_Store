'use strict';

const {USER_TABLE,UserSchema}=require('../models/user.model')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(USER_TABLE,'updated_at',UserSchema.updatedAt);
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
