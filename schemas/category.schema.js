const Joi=require('joi');

const id=Joi.number().integer();
const name=Joi.string().min(3).max(30);
const image=Joi.string().uri();

const createCategorySchema=Joi.object({
    name:name.required(),
    image: image.required()
})

const idCategoryValidation=Joi.object({
    id:id.required()
})


module.exports={
    createCategorySchema,
    idCategoryValidation
}