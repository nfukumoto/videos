async function conecta(){
    const mysql = require("mysql2/promise")
    const conn = await mysql.createConnection({
        host:"localhost",
        user:"nfukumoto",
        password:"24052003nN@!",
        database: "projeto_video"
    })
    console.log("mySQL conectado!")
    global.connection = conn
    return connection
}

//conecta()

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
    console.log(rows)
    return rows
}

//selectFilmes()
//selectFilme()
//selectSingle(10)

module.exports = {selectFilmes,selectFilme,selectSingle}