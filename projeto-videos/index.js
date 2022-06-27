(async () => {
    const express = require('express')
    const app = express()
    const db = require("./database/db.js")
    const url = require("url")
    const port = 3000
    const bodyParser = require('body-parser')
    const session = require('express-session')
    const MySQLStore = require('express-mysql-session')(session);

    const options ={
        expiration: 1000*60*60*24,
        createDatabaseTable: true,
        host: 'localhost',
        port: 3306,
        user: 'kayke',
        password: 'K310104+a',
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

    const connection = require('./database/Database')
    const contatoController = require('./contato/contatoController')
    const filmesController = require('./filmes/filmesController')
    const carrinhoController = require('./carrinho/carrinhoController')
    const usuarioController = require('./usuario/usuarioController')

    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.set("view engine", "ejs")
    app.use('/public',express.static('public'))
    app.use('/', contatoController)
    app.use('/', filmesController)
    app.use('/', carrinhoController)
    app.use('/', usuarioController)
    app.use(session({
        secret:'owieuwhjck23xjce1WYFCKSJ457fgdO4IEWUQ8sdf1NBV',
        cookie:{maxAge:1000*60*60*24},
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }))

    connection.authenticate()
        .then(()=>{console.log('Mysql conectado')})
        .catch((err)=>{console.log(err)})

    const consulta = await db.selectFilmes()
    const consultaFilme = await db.selectFilme()


    app.get("/UpdPromo",async(req, res) => { // Chama a página de atualização e traz a mudadas variáveis
        let result = await db.selectPromo()
        for (let i = 0; i < result.length; i++) {
            result[i].imagem_fi = result[i].imagem_fi.toString('base64')
        }
        res.render(`adm/atualizaPromocoes`,{
            titulo:"Conheça nossos livros",
            promo:"- Compre com 10% de desconto!",
            video:consulta,
            galeria:result,
            inicio:consultaFilme
        })
    })

    app.get("/AtualizaPromo",async(req,res) => { // Chama a página e altera o campo promo_fi de um filme_id
        let qs = url.parse(req.url,true).query
        await db.updatePromo(qs.promo,qs.id) // localhost:8080/atualiza-promo?promo=1&id=9  (No banco, o filme_id=(9), tem que estar com o campo promo_fi=(0))
        let result = await db.selectPromo()
        for (let i = 0; i < result.length; i++) {
            result[i].imagem_fi = result[i].imagem_fi.toString('base64')
        }
        res.render(`adm/atualizaPromocoes`,{
            titulo:"Conheça nossos livros",
            promo:"- Compre com 10% de desconto!",
            video:consulta,
            galeria:result,
            inicio:consultaFilme
        })
    })

    app.get('/HomeAdm', (req,res) => {
        res.render(`adm/indexAdm`)
    })

    app.get('/CadastroProdutos', (req,res) => {
        res.render(`adm/cadastroProdutos`)
    })
    
    app.get('/RelatorioChamadas', async(req,res) => {
        let chamados = await db.getChamados()
        res.render(`adm/relatorio-chamadas`,{
            chamadas:chamados
        })
    })

    app.get('/RelatorioComercial', (req,res) => {
        res.render(`adm/relatorio-comercial`)
    })

    app.listen(port, () => {
        console.log("Servidor Online")
    })

})()