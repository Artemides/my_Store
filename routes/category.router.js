const express = require('express');
const router = express.Router();
const { CategoryService } = require('../services/category.services');
const {validatorHandle}=require('../middlewares/validator.handle');
const {createCategorySchema,idCategoryValidation}=require('../schemas/category.schema')
const service = new CategoryService();

router.get('/', async (req, res, next) => {
  try {
    const result = await service.findAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', 
  validatorHandle(createCategorySchema,'body'), 
  async (req, res, next) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', 
  validatorHandle(idCategoryValidation,'params'),
  async (req, res, next) => {
  try {
    const result =await service.findOne(req.params.id, {
      include: ['products'],
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports=router;