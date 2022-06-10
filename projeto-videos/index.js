(async () => {
    const express = require('express')
    const fs = require('fs')
    const app = express()
    const db = require("./db.js")
    const path = require('path')
    const url = require("url")
    const port = 3000
    const bodyParser = require('body-parser')
    const multer = require('multer')

    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, 'uploads/')
        },
            
        filename: function(req, file, cb){
            cb(null, `${file.originalname}${Date.now()}${path.extname(file.originalname)}`)
        } 
    })

    const uploads = multer({storage})

    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
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

    app.get('/Produtos', (req,res) => {
        let result = consultaFilme
        for(var i = 0; i < result.length; i++){
            result[i].imagem_fi = result[i].imagem_fi.toString('base64')
        }

        res.render(`produtos`,{
            galeria:result
        })
    })

    app.get('/Contato', (req,res) => {
        res.render(`contato`)
    })

    app.get('/Promocoes', (req,res) => {
        res.render(`promocoes`,{
            video:consulta,
            galeria:consultaFilme
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
        let consultaSingle = await db.selectSingle(q.id)
        //const consultaInit = await db.selectSingle(25)
        consultaSingle[0].imagem_fi = consultaSingle[0].imagem_fi.toString('base64')
        res.render(`singlePreferencia`,{
            titulo:"Conheça nossos livros",
            promo:"- Compre com 10% de desconto!",
            galeria:consultaSingle
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

    app.get('/RelatorioChamadas', (req,res) => {
        res.render(`relatorio-chamadas`)
    })

    app.get('/RelatorioComercial', (req,res) => {
        res.render(`relatorio-comercial`)
    })

    app.listen(port, () => {
        console.log("Servidor Online")
    })

    app.get('/CadastroProdutos',uploads.single('file'),function(req,res){
        let file = fs.readdirSync('uploads/')[0]
        res.render(`cadastroProdutos`)
    })

    app.post('/CadastroProduto',uploads.single('file'),function(req,res){
        let file = fs.readdirSync('uploads/')
        let buf = fs.readFileSync(`uploads/${file[0]}`)
        fs.unlink(`uploads/${file[0]}`, function(err){
            if(err) throw err;
            let data = [req.body.titulo_fi, req.body.diretor_fi, req.body.link_trailer_fi, req.body.ano_fi, req.body.genero_fi, req.body.sinopse_fi, req.body.valor_fi, buf]
            console.log(data);
            (async()=>{
                await db.setProduct(data)
                res.send(data)
            })()
        })

    })

})()