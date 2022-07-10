const {models}=require('../libs/sequelize');
const {hash}=require('bcrypt');
class CustomerService {
    constructor(){
        
    }
    create(data){
        return new Promise(async(resolve,reject)=>{
           const result=await models.Customer.create({
            ...data,
            user:{
                ...data.user,
                password: await hash(data.user.password,10)
            }
           },{  
            include:['user']
           }).catch(err=>reject(err));
           delete result.dataValues.user.password;
           resolve(result);
        })
    }
    findAll(){
        return new Promise(async(resolve,reject)=>{
            const response=await models.Customer.findAll({
                include:['user']
            }).catch(err=>reject(err));
            resolve(response);
        })
    }
    
}
module.exports=CustomerService;


