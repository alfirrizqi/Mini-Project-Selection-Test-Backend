const { DataTypes } = require('sequelize');
const { sequelize } = require('.');



const Users = (sequelize) => {
    return sequelize.define("user", {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
   
        },
        token:{
            type: DataTypes.STRING,
           
        },
        verify_at:{
            type: DataTypes.DATE,
        },
        verify_token: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'user'
    })
}
module.exports = Users;