const express = require('express')
const Usuario = require('./Usuario')
const Cadastro = require('./Cadastro')
const session = require('express-session')
const nodemailer = require('nodemailer')
const connection = require('../database/Database')
const crypto = require('crypto')
const fs = require('fs')
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
    cookie: {maxAge: 1000*60*60*24},
    store: sessionStore,
    resave: false,
	saveUninitialized: false
}))

router.get('/Login', (req,res) => {
    const msgErr = req.query['msgErr']
    res.render(`usuario/login`,{msgErr:msgErr})
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
            res.redirect('/Login?msgErr=403')
        }
    })
})

router.get('/recuperarSenha',(req,res)=>{
    res.render('usuario/recuperarSenha')
})

router.post('/recuperarSenha', (req,res)=>{
    const email = req.body.email

    Usuario.findOne({raw:true, attributes:['token_us'], where:{email_us:email}}).then((result)=>{
        let msg = fs.readFileSync('./html/gmail1.html','utf-8')
        msg += result.token_us
        msg +=  fs.readFileSync('./html/gmail2.html','utf-8')

        transporter.sendMail({
            from: "squand4code@gmail.com",
            to: email,
            subject: "Recuperação de Senha",
            html:msg
        })
        .then((msg)=>{
            console.log(msg);
            res.redirect('/Login')
        })
    })
    
})

router.get('/alterarSenha/:token', (req, res) =>{
    const token = req.params.token
    res.render('usuario/alterarSenha',{token:token})
})

router.post('/alterarSenha/:token', (req, res) =>{
    const token = req.params.token
    const senha = req.body.senha
    Usuario.update({senha_us:senha},{where:{token_us:token}}).then(()=>{
        res.redirect('/Login')
    })
})

router.get('/Cadastro', (req,res) => {
    res.render(`usuario/cadastro`,{user:{nome:''}})
})

router.post('/Cadastro', async(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha

    const num = parseInt(Math.random()*9000000 + 1000000)

    Cadastro.create({
        nome:nome,
        email:email,
        senha:senha,
        isAdm: false,
        numeroConfirmacao: num.toString()
    })

    let msg = fs.readFileSync('./html/cadastro1.html','utf-8')
    msg += num.toString()
    msg += fs.readFileSync('./html/cadastro2.html','utf-8')

    transporter.sendMail({
        from: "squand4code@gmail.com",
        to: email,
        subject: "Confirme seu cadastro",
        html:msg
    })
    .then(()=>{
        res.redirect('/Login')
    })
    .catch((err)=>{
        res.send(err)
    })  
})

router.get('/efetuarCadastro/:ID', async(req,res)=>{
    const num = req.params.ID
    Cadastro.findOne({raw: true, where:{numeroConfirmacao:num.toString()}}).then((result)=>{
        cadastrarUsuario(result)
        res.redirect('/Login')
    })
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

    const num = parseInt(Math.random()*9000000 + 1000000)

    Cadastro.create({
        nome:nome,
        email:email,
        senha:senha,
        isAdm: true,
        numeroConfirmacao: num.toString()
    })

    let msg = fs.readFileSync('./html/cadastro1.html','utf-8')
    msg += num.toString()
    msg += fs.readFileSync('./html/cadastro2.html','utf-8')

    transporter.sendMail({
        from: "squand4code@gmail.com",
        to: email,
        subject: "Confirme seu cadastro",
        html:msg
    })
    .then(()=>{
        res.redirect('/Login')
    })
    .catch((err)=>{
        res.send(err)
    })  
    
})

 async function cadastrarUsuario(info, rota){    
    crypto.randomBytes(100, function(err, buffer) {
        let token = buffer.toString('hex');

        Usuario.create({
            nome_us: info.nome,
            email_us: info.email,
            senha_us: info.senha,
            adm_us: info.isAdm,
            token_us: token
        }).then(()=>{
            Cadastro.destroy({where:{email:info.email}})
        })
    });
}

router.use('/logout', function (req, res) {
    req.session.destroy()
    res.clearCookie('connect.sid', { path: '/' });
    res.redirect("/Login") 
 
})

module.exports = router