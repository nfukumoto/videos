const express = require('express')
const Usuario = require('./Usuario')
const session = require('express-session')
const nodemailer = require('nodemailer')
const fs = require('fs')
const { info } = require('console')

const router = express.Router();

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"squand4code@gmail.com",
        pass:'xxqgbasdxnlhaerc'
    }
});

router.use(session({
    secret:'owieuwhjck23xjce1WYFCKSJ457fgdO4IEWUQ8sdf1NBV',
    cookie: {maxAge: 1000*60*60*24}
}))

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
            
            req.session.usuario_id = result.usuario_id
            req.session.email = email
            req.session.nome = result.nome_us
            
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

router.get('/recuperarSenha',(req,res)=>{
    res.render('usuario/recuperarSenha')
})

router.post('/recuperarSenha', (req,res)=>{
    const email = req.body.email
    
    const file = fs.readFileSync('./html/gmail.html','utf-8')

    transporter.sendMail({
        from: "squand4code@gmail.com",
        to: email,
        subject: "Recuperação de Senha",
        html:file
    })
    .then((msg)=>{
        console.log(msg);
        res.redirect('/Login')
    })
    .catch((err)=>{
        console.log(err);
        res.send(err)
    })
})

router.get('/alterarSenha', (req, res) =>{
    res.render('usuario/alterarSenha')
})

router.post('/alterarSenha', (req, res) =>{
    const email = req.body.email
    const senha = req.body.senha
    Usuario.update({senha_us:senha},{where:{email_us:email}}).then(()=>{
        res.redirect('/Login')
    })
})

router.get('/Cadastro', (req,res) => {
    res.render(`usuario/cadastro`,{user:''})
})

router.post('/Cadastro', async(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha

    const info = {nome:nome, email:email, senha:senha, isAdm: false}
    await cadastrarUsuario(info)
    res.redirect('/Login')    
})

router.get('/Perfil', (req,res) => {
    const ID = req.session.usuario_id
    Usuario.findByPk(ID, {raw:true}).then((result)=>{
        res.render(`usuario/perfilUsuario`,{data:result,user:req.session})
    })
})

router.post('/atualizarDadosUsuario', (req,res)=>{
    const ID = req.session.usuario_id
    Usuario.update({
       nome_us:req.body.nome,
       email_us: req.body.email,
       telefone_us: req.body.telefone
    },{where:{usuario_id:ID}}).then(()=>{
        res.redirect('/Perfil')
    })
})

router.get('/LoginAdm', (req,res) => {
    res.render(`adm/loginAdm`)
})

router.get('/CadastroAdm', (req,res) => {
    res.render(`adm/cadastroAdm`)
})

router.post('/CadastrarAdm',async(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha

    const info = {nome:nome, email:email, senha:senha, isAdm: true}
    await cadastrarUsuario(info)
    res.redirect('/LoginAdm')
    
})

 async function cadastrarUsuario(info, rota){
    Usuario.create({
        nome_us: info.nome,
        email_us: info.email,
        senha_us: info.senha,
        adm_us: info.isAdm
    })
}

module.exports = router