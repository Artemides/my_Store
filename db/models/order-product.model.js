const {Model,DataTypes,Sequelize}=require('sequelize');
const {ORDER_TABLE}=require('../models/order.model');
const {PRODUCT_TABLE}=require('../models/product.model');

const ORDER_PRODUCT_TABLE='orders_products';

const OrderProductSchema={
    id:{
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    orderId:{
        allowNull: false,
        field:'order_id',
        type: DataTypes.INTEGER,
        references:{
            model: ORDER_TABLE,
            key: 'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
    },
    productId:{
        allowNull: false,
        field:'product_id',
        type: DataTypes.INTEGER,
        references:{
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onDelete: 'set null',
        onUpdate: 'cascade'
    },
    amount:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    createdAt:{
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at'
    },

}

class OrderProduct extends Model{
    static associate(model){

    }
    static config(sequelize){
        return({
            sequelize,
            tableName: ORDER_PRODUCT_TABLE,
            modelName: 'OrderProduct',
            timestamps: false
        })
    }
}
module.exports={
    ORDER_PRODUCT_TABLE,
    OrderProductSchema,
    OrderProduct
}