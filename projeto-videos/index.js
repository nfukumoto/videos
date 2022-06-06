const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "ejs")

app.use(express.static('projeto-videos'))
app.use("/imagens",express.static('imagens'))
app.use("/js",express.static("js"))
app.use("/jsAdm", express.static("jsAdm"))

app.get('/Home',(req,res)=>{
    res.render(`index`)
})

app.get('/Produtos', (req,res) => {
    res.render(`produtos`)
})

app.get('/Contato', (req,res) => {
    res.render(`contato`)
})

app.get('/Promocoes', (req,res) => {
    res.render(`promocoes`)
})

app.get('/Carrinho', (req,res) => {
    res.render(`carrinhoCompra`)
})

app.get('/Login', (req,res) => {
    res.render(`login`)
})

app.get('/Cadastro', (req,res) => {
    res.render(`cadastro`)
})

app.get('/Produto', (req,res) => {
    res.render(`singlePreferencia`)
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

app.get('/CadastroProdutos', (req,res) => {
    res.render(`cadastroProdutos`)
})

app.get('/RelatorioChamadas', (req,res) => {
    res.render(`relatorio-chamadas`)
})

app.get('/RelatorioComercial', (req,res) => {
    res.render(`relatorio-comercial`)
})

app.listen(port, () => {
    console.log("Servidor Online")
})