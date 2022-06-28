const Carrinho = require('./Carrinho')
const connection = require('../database/Database')
const express = require('express');
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);

const options ={
    expiration: 1000*60*60*24,
    createDatabaseTable: true,
    host: 'localhost',
    port: 3306,
    user: 'nfukumoto',
    password: '24052003nN@!',
    database: 'projeto_video',
    schema: {
        tableName: 'session_tbl',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }  
}
let sessionStore = new MySQLStore(options);

const router = express.Router();

router.use(session({
    secret:'owieuwhjck23xjce1WYFCKSJ457fgdO4IEWUQ8sdf1NBV',
    cookie:{maxAge:1000*60*60*24},
    store: sessionStore,
    resave: false,
	saveUninitialized: false
}))

router.get('/Carrinho', async(req,res) => {
    let [result] = await connection.query('SELECT carrinhos.carrinhos_id, filmes.imagem_fi, filmes.titulo_fi, filmes.valor_fi, carrinhos.qtdTelas_ca FROM carrinhos INNER JOIN filmes ON carrinhos.filmes_ca=filmes.filmes_id')
    res.render(`usuario/carrinhoCompra`,{item:result, user: req.session})
})

router.get('/addProdutoCarrinho/:ID', async(req,res)=>{
    const ID = req.params.ID

    Carrinho.create({
        usuario_ca:1,
        servico_ca:2,
        filmes_ca:ID,
        qtdTelas_ca:1
    }).then(()=>{
        res.redirect('/Carrinho')
    })
})

router.get('/deleteProdutoCarrinho/:ID', async(req,res) => {
    const ID = req.params.ID
    Carrinho.destroy({where:{carrinhos_id:ID}}).then(()=>{
        res.redirect('/Carrinho')
    })
})

module.exports = router