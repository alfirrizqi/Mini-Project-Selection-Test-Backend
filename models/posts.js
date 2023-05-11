const { DataTypes } = require('sequelize');
const { sequelize } = require('.');



const Posts = (sequelize) => {
    return sequelize.define("posts", {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        media:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        caption: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_date:{
            type: DataTypes.DATE,
        },
        user_id:{
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'user'
    })
}
module.exports = Posts