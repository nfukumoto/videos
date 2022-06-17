const express = require('express')
const Chamados = require('./Chamados')

const router = express.Router();

router.get('/Contato', (req,res) => {
    res.render(`usuario/contato`)
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

/*app.get('/RelatorioChamadas', async (req,res) => {
    let result = await db.getChamados()
    console.log(result);
    res.render('relatorio-chamadas',{chamadas:result})
})*/


module.exports = router;