var titulo = document.querySelector("#tituloFilme")
var imagem = document.querySelector("#imagemFilme")
var sinopse = document.querySelector("#sinopseFilme")
var elementoImagem = document.createElement("img")
elementoImagem.setAttribute("class", "w-100")
var textoLorem = "Harry, conhecido apenas como H, é um homem misterioso que trabalha para uma empresa de carros-fortes e movimenta grandes quantias de dinheiro pela cidade de Los Angeles. Quando, ao impedir um assalto, ele surpreende a todos com suas habilidades de combate, suas verdadeiras intenções começam a ser questionadas e um plano maior é revelado."

let filme = '{"titulo":"Infiltrado", "imagem":"https://capas-p.imagemfilmes.com.br/164908_000_p.jpg","sinopse":"Lorem aqui", "preco":10.50}'
var filmeJSON = JSON.parse(filme)

filmeJSON.sinopse = textoLorem

elementoImagem.setAttribute("src",filmeJSON.imagem)
imagem.appendChild(elementoImagem)
titulo.innerHTML = filmeJSON.titulo
sinopse.innerHTML = (filmeJSON.sinopse).substring(0, 400) + "..."

let lista = new Array()

function btnClick(){
    var quantidade = document.querySelector("#quantidade").value
    if(confereSeVazio(quantidade));
    else if(confereSeMenorQueUm(quantidade));
    else{
        if(localStorage.produtosNoCarrinho!=null){ 
            lista = JSON.parse(localStorage.produtosNoCarrinho)
        }    
        addProduto(quantidade)
        location.href="carrinhoCompra.html"
    }
}

function confereSeVazio(value){
    if(value==""){
        alert("Preencha o campo quantidade !")
        return true
    }
    return false
}

function confereSeMenorQueUm(value){
    if(value<1){
        alert("A quantidade deve ser maior que zero !")
        return true
    }
    return false
}

function addProduto(value){
    lista.push({img:filmeJSON.imagem, qtd: value, preco: filmeJSON.preco})
    console.log(lista)
    localStorage.setItem("produtosNoCarrinho", JSON.stringify(lista))
    
}

function getProdutoJSON(){
    var produtoJSON = {img:"", qtd:"", preco:""}
    return produtoJSON
}