const Joi = require('joi');

const id = Joi.string().uuid();
const dni = Joi.string().length(8);
const name = Joi.string().min(1).max(15);
const lastName = Joi.string().min(1).max(15);
const email = Joi.string().email();
const born = Joi.date();


const createUserSchema = Joi.object({
  dni: dni.required(),
  name: name.required(),
  lastName: lastName.required(),
  born: born.required(),
  email,
})
const updateUserSchema = createUserSchema;
const patchUserSchema = Joi.object({
  id,
  dni,
  name,
  lastName,
  born,
  email
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
