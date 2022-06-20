const Sequelize = require('sequelize')
const connection = new Sequelize('projeto_video','renanp','Ren@nm73626',{
    host:'localhost',
    dialect: 'mysql',
    timezone:"-03:00"
})

module.exports = connection;