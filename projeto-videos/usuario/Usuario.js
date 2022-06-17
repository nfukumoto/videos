const Sequelize = require('sequelize')
const connection = require('../database/Database')

const Usuario = connection.define('usuarios', {
    usuario_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome_us:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email_us:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone_us:{
        type: Sequelize.STRING,
        allowNull: true
    },
    senha_us:{
        type: Sequelize.STRING,
        allowNull: false
    },
    adm_us:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

Usuario.sync({force:false}).then(()=>{})

module.exports = Usuario