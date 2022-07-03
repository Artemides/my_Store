const { required } = require('joi');
const Joi = require('joi');

const id = Joi.string().uuid();
const email = Joi.string().email();
const password =Joi.string().min(8);


const createUserSchema = Joi.object({
  email:email.required(),
  password:password.required(),
})
const updateUserSchema = createUserSchema;
const patchUserSchema = Joi.object({
  email:email.required(),
  password: password.required()
});

const uuidUserSchema = Joi.object({
  id: id.required()
})


module.exports = {
  createUserSchema,
  updateUserSchema,
  patchUserSchema,
  uuidUserSchema
}
