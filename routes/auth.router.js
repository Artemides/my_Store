const express=require('express');
const passport=require('passport');
const jwt=require('jsonwebtoken');
const {config}=require('../config/config');
const router=express.Router();
router.post('/login',
    passport.authenticate('local',{session:false}),
    (req,res,next)=>{
        try {
            const payload={
                sub:req.user.id,
                role: req.user.role
            }
            res.json({
                user: req.user,
                token: jwt.sign(payload,config.jwtSecret)
            });
        } catch (error) {
            next(error);
        }
    });
module.exports=router;