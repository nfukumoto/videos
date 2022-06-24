const Sequelize = require('sequelize')
const connection = require('../database/Database')

const Cadastro = connection.define('cadastros', {
    cadastro_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdm:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    numeroConfirmacao:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Cadastro.sync({force:false}).then()
module.exports = Cadastro