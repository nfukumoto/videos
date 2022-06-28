const express = require('express')
const session = require('express-session')
const Filmes = require('./Filmes')
const multer = require('multer');
const connection = require('../database/Database')
const fs = require('fs')
const url = require("url")
const path = require('path')
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

const router = express()

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
        
    filename: function(req, file, cb){
        cb(null, `${file.originalname}${Date.now()}${path.extname(file.originalname)}`)
    } 
})

const uploads = multer({storage})

router.use(session({
    secret:'owieuwhjck23xjce1WYFCKSJ457fgdO4IEWUQ8sdf1NBV',
    cookie:{maxAge: 1000*60*60*24},
    store: sessionStore,
    resave: false,
	saveUninitialized: false
}))

router.get('/',(req,res)=>{

    if(req.session.usuario_id != undefined){
        Filmes.findAll({
            attributes:[`filmes_id`, `titulo_fi`, `genero_fi`, `ano_fi`, `diretor_fi`, `sinopse_fi`, `link_trailer_fi`, `valor_fi`, `imagem_fi`],
            raw:true
        })
        .then((data)=>{
            result = data
            for (let i = 0; i < result.length; i++) {
                result[i].imagem_fi = result[i].imagem_fi.toString('base64')
            }
            res.render(`usuario/index`,{galeria:result, user:req.session})
        })
    }
    else{
        res.redirect('/Login')
    }

   
})

router.get('/Produtos', (req,res) => {
    Filmes.findAll({
        attributes:[`filmes_id`, `titulo_fi`, `genero_fi`, `ano_fi`, `diretor_fi`, `sinopse_fi`, `link_trailer_fi`, `valor_fi`, `imagem_fi`],
        raw:true
    })
    .then((data)=>{
        result = data
        for (let i = 0; i < result.length; i++) {
            result[i].imagem_fi = result[i].imagem_fi.toString('base64')
        }
        res.render(`usuario/produtos`,{galeria:result, user:req.session})
    })
})

router.get("/Produto",async(req, res) => {
    let infoUrl = req.url
    let urlProp = url.parse(infoUrl,true)
    let q = urlProp.query
    Filmes.findByPk(q.id).then((result)=>{
        result.imagem_fi = result.imagem_fi.toString('base64')
        res.render(`usuario/singlePreferencia`,{galeria:result, user:req.session})
    })
})

router.get('/Promocoes', async(req,res) => {
    Filmes.findAll({
        attributes:[`filmes_id`, `titulo_fi`, `genero_fi`, `ano_fi`, `diretor_fi`, `sinopse_fi`, `link_trailer_fi`, `valor_fi`, `imagem_fi`,`promo_fi`],
        raw:true,
        where:{promo_fi:1}
    })
    .then((data)=>{
        result = data
        for (let i = 0; i < result.length; i++) {
            result[i].imagem_fi = result[i].imagem_fi.toString('base64')
        }
        res.render(`usuario/promocoes`,{galeria:result, user:req.session})
    }).catch((err)=>{console.log(err)})
})

router.get('/CadastroProdutos',function(req,res){
    res.render(`adm/cadastroProdutos`)
})

router.post('/CadastroProduto',uploads.single('file'),function(req,res){
    let file = fs.readdirSync('./uploads')
    let buf = fs.readFileSync(`./uploads/${file[0]}`)
    fs.unlink(`./uploads/${file[0]}`, function(err){
        if(err) throw err;
        Filmes.create({
            titulo_fi:req.body.titulo_fi,
            genero_fi:req.body.genero_fi,
            ano_fi:req.body.ano_fi,
            diretor_fi:req.body.diretor_fi,
            sinopse_fi:req.body.sinopse_fi,
            link_trailer_fi:req.body.link_trailer_fi,
            valor_fi:req.body.valor_fi,
            imagem_fi:buf
        }).then(()=>{
            res.redirect('/CadastroProdutos')
        }).catch((err)=>{
            console.log(err);
        })
    })
})

module.exports = router