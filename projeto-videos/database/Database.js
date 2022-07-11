const Sequelize = require('sequelize')
const connection = new Sequelize('projeto_video','Devlux','RafaRita#22',{
    host:'localhost',
    dialect: 'mysql',
    timezone:"-03:00"
})

module.exports = connection;