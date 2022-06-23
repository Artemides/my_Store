const express = require('express');
const router = express.Router();
const userService = require('../services/user.services');
const {
  createUserSchema,
  updateUserSchema,
  patchUserSchema,
  uuidUserSchema
} = require('../schemas/user.schema');
const { validatorHandle } = require('../middlewares/validator.handle');

const service = new userService();
router.get('/', async (req, res, next) => {
  await service.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(err => {
      next(err);
    });
});
router.post('/',
  validatorHandle(createUserSchema, 'body'),
  async (req, res, next) => {
    data=req.body;
    await service.create(data)
      .then(data=>{
          res.status(201).json(data);
      })
      .catch(err=>{
        next(err);
      })
  });
router.patch('/:id',
  validatorHandle(uuidUserSchema,'params'),
  validatorHandle(patchUserSchema,'body'),
  (req,res,next)=>{
    const data=req.body;
    service.patch(req.params.id,data)
      .then(result=>{
        res.status(200).json({"message":"updated",...result});
      })
      .catch(err=>{
        next(err);
      })
  })
module.exports = router;
