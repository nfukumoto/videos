const express = require('express')
const Usuario = require('./Usuario')
const session = require('express-session')

const router = express.Router();

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

router.get('/Cadastro', (req,res) => {
    res.render(`usuario/cadastro`)
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

router.post('/CadastrarAdm',(req,res)=>{
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha

    Usuario.create({
        nome_us: nome,
        email_us: email,
        senha_us: senha,
        adm_us: true
    }).then(()=>{
        res.redirect('/LoginAdm')
    })
})

module.exports = router