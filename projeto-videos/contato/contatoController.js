const express = require('express')
const Chamados = require('./Chamados')
const session = require('express-session')

const router = express.Router();
router.use(session({
    secret:'owieuwhjck23xjce1WYFCKSJ457fgdO4IEWUQ8sdf1NBV',
    cookie: {maxAge:1000*60*60*24}
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