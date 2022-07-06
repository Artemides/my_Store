const Joi=require('joi');

const id=Joi.number().integer();
const customerId=Joi.number().integer();
// ORDER-PRODUCT
const orderId=Joi.number().integer();
const productId=Joi.number().integer();
const amount=Joi.number().integer().min(1);


const createOrderSchema=Joi.object({
    customerId:customerId.required()
})
const idValidationSchema=Joi.object({
    id:id.required()
})
const addProductToOrderSchema=Joi.object({
    orderId:orderId.required(),
    productId:productId.required(),
    amount:amount.required()
})


module.exports={
    createOrderSchema,
    idValidationSchema,
    addProductToOrderSchema
}