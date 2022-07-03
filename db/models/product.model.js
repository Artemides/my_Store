const {Model,DataTypes,Sequelize}=require('sequelize');
const {CATEGORY_TABLE}=require('../models/category.model');

const PRODUCT_TABLE="products";
// name,
//   price,
//   description,
//   isBlocked,
//   image
const ProductSchema={
    id:{
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
        type: DataTypes.INTEGER
    },
    name:{
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    price: {
        allowNull:false,
        type:DataTypes.DOUBLE,
    },
    isBlocked:{
        allowNull:false,
        field: 'is_blocked',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    image:{
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt:{
        field: 'created_at',
        allowNull:false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    categoryId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'category_id',
        references:{
            model:CATEGORY_TABLE,
            key:'id'
        },
        onUpdate:'cascade',
        onDelete:'set null',
    }
}

class Product extends Model{
    static associate(models){
        this.belongsTo(models.Category,{
            as:'category'
        })
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }
}

module.exports = {
    PRODUCT_TABLE,
    ProductSchema,
    Product,
}