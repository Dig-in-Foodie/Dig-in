const {sequelize}= require('./db')
const {Post} = require('./Post')
const {User} = require('./User')
const {posts}= require('./seedData')
const {users} = require('./seedData')
const bcrypt = require('bcrypt')

const seed = async ()=>{
    await sequelize.sync({force:true})
    await Post.bulkCreate(posts)

    for(let i=0; i<users.length; i++){
        const user = users[i]
        const hash = await bcrypt.hash(user.password,10)
        await User.create({username: user.username, password: hash, isAdmin: user.isAdmin})
    }
    
}

module.exports = seed;