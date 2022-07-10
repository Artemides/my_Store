const express=require('express');
const passport = require('passport');
const { checkRole, checkAdminRole } = require('../middlewares/auth.handler');
const router=express.Router();
const {validatorHandle}=require('../middlewares/validator.handle');
const {createOrderSchema,idValidationSchema,addProductToOrderSchema}=require('../schemas/order.schema');
const OrderService = require('../services/orders.services');
const service=new OrderService();
router.get('/',
    passport.authenticate('jwt',{session:false}),
    checkAdminRole,
    async(req,res,next)=>{
    try {
        const response= await service.findAll();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})
router.get('/my-orders',
    passport.authenticate('jwt',{session:false}),
    checkRole('customer'),       
    async (req,res,next)=>{
        try {
            const response=await service.findByCustomer(req.user.sub);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }   
);
router.get('/:id',
    validatorHandle(idValidationSchema,'params'),
    async(req,res,next)=>{
    try {
        const response=await service.findOne(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})
router.post('/',
    passport.authenticate('jwt',{session:false}),
    checkRole('customer'),
    async(req,res,next)=>{
        try {
            req.body.userId=req.user.sub;
            const response=await service.create(req.body);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
})

router.post('/product-order',
    validatorHandle(addProductToOrderSchema,'body'),
    async (req,res,next)=>{
        try {
            const response=await service.addProductOrder(req.body);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }    
)

module.exports=router;