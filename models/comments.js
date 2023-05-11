const { DataTypes } = require('sequelize');
const { sequelize } = require('.');



const Comments = (sequelize) => {
    return sequelize.define("comments", {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        post_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment:{
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        tableName: 'comments'
    })
}
module.exports = Comments;