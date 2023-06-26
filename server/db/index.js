const {Post}= require('./Post')
const {User}= require('./User')
const {sequelize, Sequelize}= require('./db')

Post.belongsTo(User,{foreignKey:'userId'})
User.hasMany(Post)

module.exports={
    Post,
    User,
    sequelize,
    Sequelize
};