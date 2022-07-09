const Joi = require('joi')

const id = Joi.number().integer();
const name = Joi.string()
  .min(3)
  .max(15);
const price = Joi.number().min(0).max(10000);
const description = Joi.string().min(3).max(100);
const image=Joi.string().uri();
const isBlocked=Joi.bool();
const categoryId=Joi.number().integer();

// LIMIT PARAMS
const limit=Joi.number().integer().min(1).max(100);
const offset=Joi.number().integer().min(0);
const byPrice=Joi.number().integer().min(0.1);
const min_price=Joi.number().integer().min(0.1);
const max_price=Joi.number().integer().min(0.1);


const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
  isBlocked,
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name,
  price,
  description,
  isBlocked,
  image,
  categoryId,
});
const getProductSchema = Joi.object({
  id: id.required()
})
const filterSchema = Joi.object({
  limit,
  offset,
  byPrice,
  min_price,
  max_price: max_price.when('min_price', {
    is: Joi.number().integer().exist(),
    then: Joi.required(),

  }).greater(Joi.ref('min_price')),
})
module.exports = { 
  createProductSchema, 
  updateProductSchema, 
  getProductSchema,
  filterSchema
}
