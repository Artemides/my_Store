const {models}=require('../libs/sequelize');

class OrderService{
    async create(data){
        const customer= await models.Customer.findOne({
            where:{
                'user_id':data.userId
            }
        })
        data.customerId=customer.id;
        const response=await models.Order.create(data);
        return response;
    }
    async findAll(){
        const response=await models.Order.findAll({
            include:['items']
        });
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
    async findByCustomer(id){
        const response=await models.Order.findOne({
            include:[
                {
                    association: 'customer',
                    where:{
                        'user_id':id
                    },
                },
                "items"
            ],
    
        })
        return response;
    }
    async addProductOrder(data){
        const response=await models.OrderProduct.create(data);
        return response;
    }
}
module.exports=OrderService;