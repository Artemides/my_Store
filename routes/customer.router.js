const express=require('express');
const router=express.Router();
const CustomerService=require('../services/customer.services');
const {validatorHandle} =require('../middlewares/validator.handle');
const {createCustomerSchema,idCustomerValidationSchema}=require('../schemas/customer.schema');
const passport=require('passport');
const { checkRole } = require('../middlewares/auth.handler');

const service= new CustomerService();
router.get('/',
    passport.authenticate('jwt',{session:false}),
    checkRole('admin','customer'),
    async (req,res,next)=>{
        await service.findAll()
                .then(result=>{
                    res.status(200).json(result);
                })
                .catch(err=>{
                    next(err);
                })
    }
);  
router.post('/',
    validatorHandle(createCustomerSchema,'body'),
    async (req,res,next)=>{
        const data=req.body;
        await service.create(data)
            .then(result=>{
                res.status(201).json(result);
            })
            .catch(err=>{
                next(err);
            })
    });

module.exports=router;