const express = require('express')
const Usuario = require('./Usuario')

const router = express.Router();

router.get('/Login', (req,res) => {
    res.render(`usuario/login`)
})

router.post('/verificaUser', (req,res)=>{
    const email= req.body.email
    const senha = req.body.senha
    Usuario.findOne({
        raw:true,
        where:{email_us:email,senha_us:senha}
    }).then((result)=>{
        if(result != undefined){
            if(!result.adm_us){
                res.redirect('/')
            }
            else{
                res.redirect('/HomeAdm')
            }
        }
        else
        {
            res.redirect('/Login')
        }
    })
})

router.get('/Cadastro', (req,res) => {
    res.render(`usuario/cadastro`)
})

router.get('/Perfil', (req,res) => {
    res.render(`usuario/perfilUsuario`)
})

router.get('/LoginAdm', (req,res) => {
    res.render(`adm/loginAdm`)
})

router.get('/CadastroAdm', (req,res) => {
    res.render(`adm/cadastroAdm`)
})

router.post('/CadastrarAdm',(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha

    Usuario.create({
        nome_us: nome,
        email_us: email,
        senha_us: senha,
        adm_us: true
    })
})

module.exports = router