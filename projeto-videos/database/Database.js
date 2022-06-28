const Sequelize = require('sequelize')
const connection = new Sequelize('projeto_video','nfukumoto','24052003nN@!',{
    host:'localhost',
    dialect: 'mysql',
    timezone:"-03:00"
})

module.exports = connection;