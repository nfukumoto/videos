const express = require('express')
const Filmes = require('./Filmes')
const multer = require('multer');
const fs = require('fs')
const url = require("url")
const path = require('path')

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

router.get('/',(req,res)=>{
    Filmes.findAll({
        attributes:[`filmes_id`, `titulo_fi`, `genero_fi`, `ano_fi`, `diretor_fi`, `sinopse_fi`, `link_trailer_fi`, `valor_fi`, `imagem_fi`],
        raw:true
    })
    .then((data)=>{
        result = data
        for (let i = 0; i < result.length; i++) {
            result[i].imagem_fi = result[i].imagem_fi.toString('base64')
        }
        res.render(`usuario/index`,{galeria:result})
    })
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
        res.render(`usuario/produtos`,{galeria:result})
    })
})

router.get("/Produto",async(req, res) => {
    let infoUrl = req.url
    let urlProp = url.parse(infoUrl,true)
    let q = urlProp.query
    Filmes.findByPk(q.id).then((result)=>{
        result.imagem_fi = result.imagem_fi.toString('base64')
        res.render(`usuario/singlePreferencia`,{galeria:result})
    })
})

router.get('/Promocoes', async(req,res) => {
    Filmes.findAll({
        attributes:[`filmes_id`, `titulo_fi`, `genero_fi`, `ano_fi`, `diretor_fi`, `sinopse_fi`, `link_trailer_fi`, `valor_fi`, `imagem_fi`],
        raw:true
    })
    .then((data)=>{
        result = data
        for (let i = 0; i < result.length; i++) {
            result[i].imagem_fi = result[i].imagem_fi.toString('base64')
        }
        res.render(`usuario/promocoes`,{galeria:result})
    })
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