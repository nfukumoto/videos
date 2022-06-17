const Sequelize = require('sequelize')
const connection = require('../database/Database')
const Filmes = require('../filmes/Filmes')

const Carrinho = connection.define('carrinhos', {
    carrinhos_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cupom_ca:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    usuario_ca:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    servico_ca:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    filmes_ca:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    qtdTelas_ca:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Carrinho.sync({force:false}).then()
module.exports = Carrinho