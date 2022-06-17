(async () => {
    const express = require('express')
    const app = express()
    const db = require("./database/db.js")
    const url = require("url")
    const port = 3000
    const bodyParser = require('body-parser')

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

    connection.authenticate()
        .then(()=>{console.log('Mysql conectado')})
        .catch((err)=>{console.log(err)})

    const consulta = undefined//await db.selectFilmes()
    const consultaFilme = undefined//await db.selectFilme()

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

    app.get('/RelatorioComercial', (req,res) => {
        res.render(`adm/relatorio-comercial`)
    })

    app.listen(port, () => {
        console.log("Servidor Online")
    })

})()