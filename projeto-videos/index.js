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
        let result = consultaFilme;
        for (let i = 0; i < result.length; i++) {
            result[i].imagem_fi = result[i].imagem_fi.toString('base64');
            
        }
        res.render(`index`,{
            galeria:result
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

    app.get('/Promocoes2', (req,res) => {
        let result = consultaFilme
        for (let i = 0; i < result.length; i++) {
            result[i].imagem_fi = result[i].imagem_fi.toString('base64');
            
        }
        res.render(`promocoes`,{
            galeria:result
        })
    })

    app.get('/Carrinho', async(req,res) => {
        const car= await db.selectCarrinhoU()
        res.render(`carrinhoCompra`,{
            item:car
        })
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

    app.get('/RelatorioChamadas', async (req,res) => {
        let result = await db.getChamados()
        console.log(result);
        res.render('relatorio-chamadas',{chamadas:result})
        //res.render(`relatorio-chamadas`)
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

    app.post('/enviarChamado', async function(req, res){
        const result = req.body;
        let data = [result.nomeContato, result.assuntoContato, result.comentario, false, result.emailContato]
        await db.setChamado(data)
        res.redirect('/Contato')
    })

})()