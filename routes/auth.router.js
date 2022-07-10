const express=require('express');
const passport=require('passport');
const { NUMERIC } = require('sequelize');
const router=express.Router();
const AuthService=require('../services/auth.services');
const MailService=require('../services/mail.services');
const {validatorHandle} =require('../middlewares/validator.handle');
const {emailCustomerValidation}=require('../schemas/customer.schema');
const service=new AuthService();
const mailService=new MailService();
router.post('/login',
    passport.authenticate('local',{session:false}),
    (req,res,next)=>{
        try {
           res.status(200).json(service.signToken(req.user));
        } catch (error) {
            next(error);
        }
    });
router.post('/recover',
    validatorHandle(emailCustomerValidation,'body'),
    async (req,res,next)=>{
    try {
        const {email}=req.body;
        const response=await mailService.sendMailPasswordReset(email);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})
router.post('/change-password',async (req,res,next)=>{
    try {
        const {token,newPassword}=req.body;
        const response=await service.changePassword(token,newPassword);
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})
module.exports=router;