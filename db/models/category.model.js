const {Model,DataTypes,Sequelize}=require('sequelize');

const CATEGORY_TABLE='categories';

const CategorySchema={
    id: {
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    name:{
        allowNUll:false,
        type:DataTypes.STRING,
    },
    image:{
        allowNull:true,
        type:DataTypes.STRING,
    },
    crateteAt:{
        allowNull:false,
        type:DataTypes.DATE,
        defaultValue:Sequelize.NOW,
        field:'created_at'
    },
    updateAt:{
        allowNull:true,
        type:DataTypes.DATE,
        field:'updated_at'
    }
}


class Category extends Model{
    static associate(models){
        this.hasMany(models.Product,{
            as:'products',
            foreignKey:'categoryId'
        })
    }
    static config(sequelize){
        return({
            sequelize,
            tableName:CATEGORY_TABLE,
            modelName:'Category',
            timestamps:false,
        })
    }
    
}
module.exports={
    CATEGORY_TABLE,
    CategorySchema,
    Category
}