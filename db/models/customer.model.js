const {Model,DataTypes,Sequelize}=require('sequelize');
const {USER_TABLE}=require('../models/user.model');

const CUSTOMER_TABLE='customers';


const CustomerSchema={
    id:{
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    name:{
        allowNull: false,
        type:DataTypes.STRING
    },
    lastName:{
        type:DataTypes.STRING,
        field: 'last_name'
    },
    bornDate:{
        allowNull: false,
        type:DataTypes.DATE,
        field:'born_date'
    },
    country:{
        allowNull:true,
        type: DataTypes.STRING,
    },
    createdAt:{
        allowNull: false,
        type:DataTypes.DATE,
        defaultValue:Sequelize.NOW,
        field:'created_at'
    },
    updatedAt:{
        allowNull: true,
        type:DataTypes.DATE,
        field:'updated_at'
    },
    userId:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        unique: true,
        references: {
            model:USER_TABLE,
            key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'set null',
    }
}


class Customer extends Model{
    static associate(model){
        this.belongsTo(model.User, {as: 'user'});
    }
    static config(sequelize){
        return{
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false
        }

    }
}

module.exports={
    CUSTOMER_TABLE,
    CustomerSchema,
    Customer
}