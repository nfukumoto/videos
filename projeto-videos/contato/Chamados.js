const Sequelize = require('sequelize')
const connection = require('../database/Database')

const Chamados = connection.define('chamados',{
    chamada_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true 
    },
    nome_ch:{
        type: Sequelize.STRING,
        allowNull: false
    },
    assunto_ch:{
        type: Sequelize.STRING,
        allowNull: false
    },
    comentario_ch:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    email_ch:{
        type: Sequelize.STRING,
        allowNull: false
    },
    atendido_ch:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

Chamados.sync({force:false}).then(()=>{})
module.exports = Chamados