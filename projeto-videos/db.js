async function conecta(){
    const mysql = require("mysql2/promise")
    const conn = await mysql.createConnection({
        host:"localhost",
        user:"renanp",
        password:"Ren@nm73626",
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
    return rows
}

async function setProduct(data){
    const conectado = await conecta()
    //const [result] = await conectado.query("UPDATE filmes SET imagem_fi = ? WHERE (filmes_id = 25)",data[7]);
    const [result] = await conectado.query("INSERT INTO filmes (titulo_fi,diretor_fi,link_trailer_fi,ano_fi,genero_fi, sinopse_fi,valor_fi, imagem_fi) VALUES (?,?,?,?,?,?,?,?)", [data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]])
}

async function selectCarrinhoU(){
    const conectado = await conecta()
    const [rows] = await conectado.query("SELECT f.titulo_fi, f.valor_fi, cu.carrinho_id, cu.qtd, cu.filme_id FROM carrinho_user AS cu INNER JOIN filmes AS f ON cu.filme_id = f.filmes_id ORDER BY cu.carrinho_id ASC")
    //console.log(rows)
    return rows 
}

//selectFilmes()
//selectFilme()
//selectSingle(10)

module.exports = {selectFilmes,selectFilme,selectSingle,setProduct,selectCarrinhoU}