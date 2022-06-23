const Sequelize = require('sequelize')
const connection = new Sequelize('projeto_video','mar56','#Mar624153@!',{
    host:'localhost',
    dialect: 'mysql',
    timezone:"-03:00"
})

module.exports = connection;