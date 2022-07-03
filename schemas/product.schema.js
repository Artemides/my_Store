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

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
