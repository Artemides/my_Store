const {models}=require('../libs/sequelize');

class CustomerService {
    constructor(){

    }
    create(data){
        return new Promise(async(resolve,reject)=>{
           const result=await models.Customer.create(data,{
            include:['user']
           }).catch(err=>reject(err));
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


