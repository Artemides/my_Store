const express = require('express')
const productService = require('../services/product.services')
const { validatorHandle } = require('../middlewares/validator.handle');
const { 
  getProductSchema, 
  createProductSchema, 
  updateProductSchema,
  filterSchema
} = require('../schemas/product.schema')
const passport=require('passport');
const { checkAdminRole } = require('../middlewares/auth.handler');
const router = express.Router();

const service = new productService();
router.get('/',
   
  validatorHandle(filterSchema,'query'),
  async (req, res, next) => {
  console.log(req.params)
  await service.find(req.query)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err);
    });

}

);
router.get('/:id',
  validatorHandle(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    await service.findOnde(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err)
      });

  })
router.post('/',
  passport.authenticate('jwt',{session:false}),
  checkAdminRole,
  validatorHandle(createProductSchema, 'body'),
  async (req, res,next) => {
    await service.create(req.body)
      .then(data=>{
        res.status(201).json(data);
      })
      .catch(err=>{
        next(err);
      });
    
  })

router.put('/:id',
  validatorHandle(getProductSchema, 'params'),
  validatorHandle(updateProductSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.update(id, req.body));
    } catch (error) {
      res.status(500).json({ "message": error.message })
    }

  })
router.patch('/:id',
  validatorHandle(getProductSchema, 'params'),
  validatorHandle(updateProductSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    res.status(200).json(await service.patch(id, data));
  })
router.delete('/:id',async (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(await service.delete(id));
  } catch (err) {
    next(err);
  }
})
module.exports = router;
