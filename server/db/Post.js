const {Sequelize, sequelize} = require('./db')

const Post = sequelize.define('post',{
    title: Sequelize.STRING,
    image: Sequelize.STRING,
    country: Sequelize.STRING,
    city: Sequelize.STRING,
    description: Sequelize.STRING,
   

});

module.exports = {Post};