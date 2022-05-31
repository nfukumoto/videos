var titulo = document.querySelector("#tituloFilme")
var imagem = document.querySelector("#img")
var sinopse = document.querySelector("#sinopseFilme") 
imagem.setAttribute("class", "w-100") 

var textoLorem = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, aperiam? Neque, minus dolor nostrum facilis sunt in amet reprehenderit assumenda numquam suscipit deserunt, odio debitis dolore doloremque maxime voluptate inventore libero modi cum perspiciatis asperiores. Incidunt voluptate harum odio fugiat nemo!"

let filme = '{"titulo":"Titulo Escolhido",  "trailer":"https://www.youtube.com/embed/ZxgPySJkxN8","sinopse":"Lorem aqui", "preco":10.50}'
var filmeJSON = JSON.parse(filme)

let filmeEscolhido =JSON.parse(localStorage.getItem("filmeEscolhido"))    // MODIFICAR DEPOIS

filmeJSON.sinopse = textoLorem;
imagem.setAttribute("src",filmeEscolhido.img)
titulo.innerHTML = filmeEscolhido.titulo
sinopse.innerHTML = (filmeEscolhido.descricao).substring(0, 400) + "...";

let pref= JSON.parse(localStorage.getItem("preferencias"))
let titulosRelacionados = document.querySelector("#relacionados")
carregaProdutosRelacionados(pref)

let lista = new Array();

function btnClick(){
    var quantidade = document.querySelector("#quantidade").value;
    if(confereSeVazio(quantidade));
    else if(confereSeMenorQueUm(quantidade));
    else{
        if(localStorage.produtosNoCarrinho!=null){ 
            lista = JSON.parse(localStorage.produtosNoCarrinho);
        }    
        addProduto(quantidade)
        location.href="carrinhoCompra.html"
    }
}

function confereSeVazio(value){
    if(value==""){
        alert("Preencha o campo quantidade !")
        return true;
    }
    return false;
}

function confereSeMenorQueUm(value){
    if(value<1){
        alert("A quantidade deve ser maior que zero !")
        return true;
    }
    return false;
}

function addProduto(value){
    lista.push({img:filmeEscolhido.img, qtd: value, preco: filmeEscolhido.preco});
    console.log(lista);
    localStorage.setItem("produtosNoCarrinho", JSON.stringify(lista))
}

function getProdutoJSON(){
    var produtoJSON = {img:"", qtd:"", preco:""}
    return produtoJSON;
}

function carregaProdutosRelacionados(produtos){
    for (let i = produtos.length-1; i >= 0; i--) {
        if(filmeEscolhido.titulo != produtos[i].titulo){
            var imagem = document.createElement("img")
            imagem.setAttribute("src", produtos[i].img)
            imagem.setAttribute("class","col-sm-4 w-50")
            titulosRelacionados.appendChild(imagem)
        }
    }
}