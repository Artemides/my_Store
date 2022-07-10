const {Model,DataTypes,Sequelize}=require('sequelize');
const {CUSTOMER_TABLE}=require('./customer.model');
const ORDER_TABLE="orders";

const OrderSchema={
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdAt:{
        allowNull:false,
        type:DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at'
    },
    customerId:{
        allowNull:false,
        type:DataTypes.INTEGER,
        field:'customer_id',
        references:{
            model:CUSTOMER_TABLE,
            key:'id'
        },
        onDelete:'set null',
        onUpdate: 'cascade'
    },
    total:{
        type: DataTypes.VIRTUAL,
        get(){
            if(this.items && this.items.length>0){
                return this.items.reduce((total,item)=>{
                    return total + item.price*item.OrderProduct.amount
                },0);
            }
            return 0;
        }
    }
}

class Order extends Model{
    static associate(models){
        this.belongsTo(models.Customer,{as:'customer'})
        this.belongsToMany(models.Product,{
            as: 'items',
            through:models.OrderProduct,
            foreignKey:'orderId',
            otherKey: 'productId'
        })
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        }
            
    }
}
module.exports={
    ORDER_TABLE,
    OrderSchema,
    Order
}