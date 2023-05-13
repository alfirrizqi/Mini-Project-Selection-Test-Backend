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
            allowNull: true,
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
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    }, {
        paranoid: true,
        timesstamps: true,
        tableName: 'posts'
    })
}
module.exports = Posts