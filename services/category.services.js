const {models}=require('../libs/sequelize');

class CategoryService{
   constructor(){

   }
    async create(data){
        const result=await models.Category.create(data);
        return result;
    }
    async findAll(){
        const result=await models.Category.findAll();
        return result;
    }
    async findOne(id){
        const result=await models.Category.findByPk(id,{
            incluse:['products']
        });
        return result
    }
}

module.exports={CategoryService};