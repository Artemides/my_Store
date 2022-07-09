const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  role:{
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {  
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt:{
    allowNull:true,
    field: 'updated_at',
    type: DataTypes.DATE,
  }
};

class User extends Model {
    static associate(models){
      this.hasOne(models.Customer,{
        as: 'user_customer',
        foreignKey: 'user_id'
      });
    }
    static config (sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

module.exports = {USER_TABLE,UserSchema,User}
