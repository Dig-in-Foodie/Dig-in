const {sequelize}= require('./db');
const seed = require('./seedFn')

seed()
.then(()=>{
    console.log("Start seeding, yum yum foodies")
})
.catch(err =>{
    console.log(err);
})
.finally(()=>{
    sequelize.close()
})