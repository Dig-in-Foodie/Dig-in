const {sequelize,Post,User}= require('./index')
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
    // const posts1= await Post.findAll()
    // const users2 = await User.findAll()
    // posts1[0].setUser(users2[0])
    
}

module.exports = seed;