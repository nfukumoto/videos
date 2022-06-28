async function conecta(){
    const mysql = require("mysql2/promise")
    const conn = await mysql.createConnection({
        host:"localhost",
        user:"nfukumoto", // Alterações necessárias aqui, e nos arquivos Database.js, contatoController.js, usuarioController.js, filmesController.js e carrinhoController.js
        password:"24052003nN@!",
        database: "projeto_video"
    })
    console.log("mySQL conectado!")
    global.connection = conn
    return connection
}

const session = require('express-session')
const mysqlSession = require('express-mysql-session')(session)

async function selectFilmes(){
    const conectado = await conecta()
    const [rows] = await conectado.query("select f.titulo_fi, f.genero_fi, f.ano_fi, f.sinopse_fi, f.imagem_fi from filmes as f order by f.titulo_fi asc")
    //console.log(rows)
    return rows
}

async function selectFilme(){
    const conectado = await conecta()
    const [rows] = await conectado.query("select * from filmes order by filmes_id desc")
    //console.log(rows)
    return rows
}

async function selectSingle(id){
    const conectado = await conecta()
    const values = [id]
    const [rows] = await conectado.query("select * from filmes where filmes_id=?",values)
    //console.log(rows)
    return rows
}

async function selectPromo(){ // Consulta registros com a coluna promo = 1
    const conectado = await conecta()
    const [rows] = await conectado.query("select * from filmes where promo_fi=1")
    //console.log(rows)
    return rows
}

async function updatePromo(promo, id){ // Altera a coluna promo para 0 ou 1 através da coluna livros_id
    const conectado = await conecta()
    const values = [promo, id]
    return await conectado.query("update filmes set promo_fi=? where filmes_id=?",values)
    return rows
}

//updatePromo(1,3)

async function setProduct(data){
    const conectado = await conecta()
    //const [result] = await conectado.query("UPDATE filmes SET imagem_fi = ? WHERE (filmes_id = 25)",data[7]);
    const [result] = await conectado.query("INSERT INTO filmes (titulo_fi,diretor_fi,link_trailer_fi,ano_fi,genero_fi, sinopse_fi,valor_fi, imagem_fi) VALUES (?,?,?,?,?,?,?,?)", [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]])
}


async function selectCarrinhoU(){
    const conectado = await conecta()
    const [rows] = await conectado.query("SELECT carrinhos.carrinhos_id, filmes.imagem_fi, filmes.titulo_fi, filmes.valor_fi, carrinhos.qtdTelas_ca FROM carrinhos INNER JOIN filmes ON carrinhos.filmes_ca=filmes.filmes_id")
    //console.log(rows)
    return rows
}

async function insertCarrinhoU(data){
    const conectado = await conecta()
    await conectado.query("INSERT INTO carrinhos (usuario_ca ,qtdTelas_ca, servico_ca, filmes_ca) VALUES (?,?,?,?)", [data[0],data[1],data[2],data[3]])
}

async function deleteCarrinhoU(data){
    const conectado = await conecta()
    await conectado.query(`DELETE FROM carrinhos WHERE carrinhos_id=${data}`)
}

async function setChamado(data){
    const conectado = await conecta()
    const [result] = await conectado.query('INSERT INTO chamados (nome_ch,assunto_ch,comentario_ch,atendido_ch,email_ch) VALUES (?,?,?,?,?)',[data[0], data[1], data[2], data[3], data[4]])
}

async function getChamados(){
    const conectado = await conecta()
    const [result] = await conectado.query(`SELECT * FROM chamados WHERE atendido_ch=${false}`)
    return result
}

async function insertUsuario(usuario){
    const conectado = await conecta()
    const values = [usuario.nome,usuario.email,usuario.telefone,usuario.senha]
    const [rows] = await conectado.query("insert into usuarios(nome_us, email_us, telefone_us, senha_us) values(?,?,?,?)",values)
    //console.log("Insert OK!")
    return rows
}

async function makeSession(app,opt){
    const conectado = await conecta()
    const sessionStore = new mysqlSession(opt,conectado)
    app.use(session({
        cookie:{maxAge:1000*60*60*24},
        secret: "hrgfgrfrty84fwir767sakjh872ekjh",
        saveUninitialized:false,
        store:sessionStore,
        resave: false 
    }))
}

module.exports = {
    selectFilmes,
    selectFilme,
    selectSingle,
    selectPromo,
    updatePromo,
    selectCarrinhoU,
    setProduct,
    setChamado,
    getChamados,
    selectCarrinhoU,
    insertCarrinhoU,
    deleteCarrinhoU,
    makeSession
}
