const userService = require('../services/user.services');
const boom = require('@hapi/boom');
const service = new userService();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const {models}=require('../libs/sequelize');
class AuthService {
  async login(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('User does not exist');
    }
    if (!await bcrypt.compare(password, user.password)) {
      throw boom.unauthorized('Password is incorrect');
    }
    delete user.dataValues.password;
    return user;
  }
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    return {
      user,
      token: jwt.sign(payload, config.jwtSecret),
    };
  }
  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await models.User.findByPk(payload.sub);
      console.log(user)
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id,{recoveryToken: null, password: hash});
      return ({message: "Password changed"});
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}
module.exports = AuthService;
