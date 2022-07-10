'use strict';
const { USER_TABLE, UserSchema } = require('../models/user.model');
const {DataTypes}=require('sequelize')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'recovery_token',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE,'recovery_token'); 
  },
};
