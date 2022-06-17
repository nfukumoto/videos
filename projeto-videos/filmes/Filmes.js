const Sequelize = require('sequelize')
const connection = require('../database/Database')

const Filmes = connection.define('filmes', {
    filmes_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo_fi:{
        type: Sequelize.STRING,
        allowNull: false
    },
    genero_fi:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ano_fi:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    diretor_fi:{
        type: Sequelize.STRING,
        allowNull: false
    },
    sinopse_fi:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    link_trailer_fi:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor_fi:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    imagem_fi:{
        type: Sequelize.BLOB('long'),
        allowNull: false
    }
})

Filmes.sync({force:false}).then(()=>{})
module.exports = Filmes