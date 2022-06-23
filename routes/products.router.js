const express = require('express')
const productService = require('../services/product.services')
const { validatorHandle } = require('../middlewares/validator.handle');
const { getProductSchema, createProductSchema, updateProductSchema } = require('../schemas/product.schema')

const router = express.Router();

const service = new productService();
router.get('/', async (req, res, next) => {
  await service.find()
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
  validatorHandle(createProductSchema, 'body'),
  (req, res) => {
    const products = service.create(req.body);
    res.status(201).json(products);
  })

router.put('/:id',
  validatorHandle(getProductSchema, 'params'),
  validatorHandle(updateProductSchema, 'body'),
  async (req, res) => {
    try {
      const { id } = req.params;
      res.status(200).json(service.update(id, req.body));
    } catch (error) {
      res.status(500).json({ "message": error.message })
    }

  })
router.patch('/:id',
  validatorHandle(getProductSchema, 'params'),
  validatorHandle(updateProductSchema, 'body'),
  (req, res) => {
    const { id } = req.params;
    const data = req.body;
    res.status(200).json(service.patch(id, data));
  })
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(service.delete(id));
  } catch (err) {
    next(err);
  }
})
module.exports = router;
