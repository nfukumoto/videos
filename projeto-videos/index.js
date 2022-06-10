(async () => {
    const { application } = require('express')
    const express = require('express')
    const app = express()
    const db = require("./db.js")
    const url = require("url")
    const port = 3000

    app.set("view engine", "ejs")
    app.use(express.static('projeto-videos'))
    app.use("/imagens",express.static("imagens"))
    app.use("/js",express.static("js"))
    app.use("/jsAdm", express.static("jsAdm"))

    const consulta = await db.selectFilmes()
    //console.log(consulta[0].video)
    const consultaFilme = await db.selectFilme()
    //console.log(consulta[0].video)

    app.get('/Home',(req,res)=>{
        res.render(`index`,{
            video:consulta,
            galeria:consultaFilme
        })
    })

    app.get("/UpdPromo",async(req, res) => { // Chama a página de atualização e traz a mudadas variáveis
        const consultaPromo = await db.selectPromo()
        res.render(`adm/atualizaPromocoes`,{
            titulo:"Conheça nossos livros",
            promo:"- Compre com 10% de desconto!",
            video:consulta,
            galeria:consultaPromo,
            inicio:consultaFilme
        })
    })

    app.get('/Produtos', (req,res) => {
        res.render(`produtos`,{
            video:consulta,
            galeria:consultaFilme
        })
    })

    app.get('/Contato', (req,res) => {
        res.render(`contato`)
    })

    app.get("/AtualizaPromo",async(req,res) => { // Chama a página e altera o campo promo_fi de um filme_id
        let qs = url.parse(req.url,true).query
        await db.updatePromo(qs.promo,qs.id) // localhost:8080/atualiza-promo?promo=1&id=9  (No banco, o filme_id=(9), tem que estar com o campo promo_fi=(0))
        const consultaPromo = await db.selectPromo()
        res.render(`adm/atualizaPromocoes`,{
            titulo:"Conheça nossos livros",
            promo:"- Compre com 10% de desconto!",
            video:consulta,
            galeria:consultaPromo,
            inicio:consultaFilme
        })
    })

    app.get("/Promocoes",async(req, res) => { // Chama a página promocoes e mostra os itens específicos
        const consultaPromo = await db.selectPromo()
        res.render(`promocoes`,{
            titulo:"Conheça nossos livros",
            promo:"- Compre com 10% de desconto!",
            //livro:consulta,
            galeria:consultaPromo
        })
    })

    app.get('/Carrinho', (req,res) => {
        res.render(`carrinhoCompra`)
    })

    app.get('/Login', (req,res) => {
        res.render(`login`)
    })

    app.get('/Cadastro', (req,res) => {
        res.render(`cadastro`)
    })

    app.get("/Produto",async(req, res) => {
        let infoUrl = req.url
        let urlProp = url.parse(infoUrl,true)
        let q = urlProp.query
        const consultaSingle = await db.selectSingle(q.id)
        const consultaInit = await db.selectSingle(4)
        res.render(`singlePreferencia`,{
            titulo:"Conheça nossos livros",
            promo:"- Compre com 10% de desconto!",
            video:consulta,
            galeria:consultaSingle,
            inicio:consultaInit
        })
    })

    app.get('/Perfil', (req,res) => {
        res.render(`perfilUsuario`)
    })

    app.get('/LoginAdm', (req,res) => {
        res.render(`loginAdm`)
    })

    app.get('/CadastroAdm', (req,res) => {
        res.render(`cadastroAdm`)
    })

    app.get('/HomeAdm', (req,res) => {
        res.render(`indexAdm`)
    })

    app.get('/CadastroProdutos', (req,res) => {
        res.render(`cadastroProdutos`)
    })

    app.get('/RelatorioChamadas', (req,res) => {
        res.render(`relatorio-chamadas`)
    })

    app.get('/RelatorioComercial', (req,res) => {
        res.render(`relatorio-comercial`)
    })

    app.listen(port, () => {
        console.log("Servidor Online")
    })

})()