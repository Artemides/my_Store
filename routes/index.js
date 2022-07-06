const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const customerRouter = require('./customer.router');
const categoryRouter=require('./category.router');
const orderRouter=require('./orders.router');
const express = require('express');

const router = express.Router();
function routerApp(app) {
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customerRouter);
  router.use('/categories', categoryRouter);
  router.use('/orders', orderRouter);
}
module.exports = routerApp;
