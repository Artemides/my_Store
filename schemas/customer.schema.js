const Joi=require('joi');

const id=Joi.number().integer();
const name=Joi.string().min(2).max(30);
const lastName=Joi.string().min(3).max(30);
const bornDate=Joi.date();
const country=Joi.string().min(3);
const userId=Joi.number().integer();


// USER
const email=Joi.string().email();
const password=Joi.string().min(8);

const createCustomerSchema=Joi.object({
    name:name.required(),
    lastName,
    bornDate: bornDate.required(),
    country,
    user: Joi.object({
        email: email.required(),
        password: password.required(),
        role: Joi.string().min(3)
    })
});
const idCustomerValidationSchema=Joi.object({
    id:id.required(),
});

module.exports={
    createCustomerSchema,
    idCustomerValidationSchema
}