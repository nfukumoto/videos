const express = require('express')
const Chamados = require('./Chamados')
const connection = require('../database/Database')
const session = require('express-session')
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

router.use(session({
    secret:'owieuwhjck23xjce1WYFCKSJ457fgdO4IEWUQ8sdf1NBV',
    cookie:{maxAge:1000*60*60*24},
    store: sessionStore,
    resave: false,
	saveUninitialized: false
}))

router.get('/Contato', (req,res) => {
    res.render(`usuario/contato`,{user:req.session})
})

router.post('/enviarChamado', function(req, res){
    const result = req.body;
    Chamados.create({
        nome_ch: result.nomeContato,
        assunto_ch: result.assuntoContato,
        comentario_ch: result.comentario,
        email_ch: result.emailContato,
        atendido_ch: false
    }).then(()=>{
        res.redirect('/Contato')
    })
})

// teste
// app.get('/RelatorioChamadas', async (req,res) => {
//     let result = await db.getChamados()
//     console.log(result);
//     res.render('relatorio-chamadas',{chamadas:result})
// })


module.exports = router;