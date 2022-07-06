const {models}=require('../libs/sequelize');

class OrderService{
    async create(data){
        const response=await models.Order.create(data);
        return response;
    }
    async findAll(){
        const response=await models.Order.findAll();
        return response;
    }
    async findOne(id){
        const response=await models.Order.findByPk(id,{
            include:[
                {
                    association: 'customer',
                    include:['user']
                },
                'items'
            ]
        });
        return response;
    }
    async addProductOrder(data){
        const response=await models.OrderProduct.create(data);
        return response;
    }
}
module.exports=OrderService;