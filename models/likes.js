const { DataTypes } = require('sequelize');
const { sequelize } = require('.');



const Likes = (sequelize) => {
    return sequelize.define("likes", {
        id:{
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'likes'
    })
}
module.exports = Likes;