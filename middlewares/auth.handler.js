const boom =require('@hapi/boom');
const{ config}=require('../config/config');
function checkApiKey(req,res,next){
    if(req.headers['api']===config.apiKey){
        next();
    }else{
        next(boom.unauthorized('Invalid API Key'));
    }
}
function checkAdminRole(req,res,next){
    console.log("ADMIN ROLE");
    console.log(req.user);
    if(req.user.role==='admin'){
        next();
    }else{
        next(boom.unauthorized('You are not authorized to perform this action'));
    }
}
function checkRole(...roles){
    return (req,res,next)=>{
        const user=req.user;
        console.log(user.role)
        if(roles.includes(user.role)){
            next();
        }else{
            next(boom.unauthorized('You are not authorized to perform this action'));
        }
    }
}
module.exports={
    checkApiKey,
    checkAdminRole,
    checkRole
}   