const productsRouter=require('./products.router');
const express=require('express');
const router=express.Router();
function routerApp(app){
  app.use('/api/v1',router)
  router.use('/products',productsRouter);
}
module.exports=routerApp;
