var titulo = document.querySelector("#tituloFilme")
var trailer = document.querySelector("#trailer")
var sinopse = document.querySelector("#sinopseFilme")
trailer.setAttribute("width", "80%")
trailer.setAttribute("height", "100%")
var textoLorem = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur ex optio quidem a nesciunt veritatis nemo sint. Est, aperiam? Neque, minus dolor nostrum facilis sunt in amet reprehenderit assumenda numquam suscipit deserunt, odio debitis dolore doloremque maxime voluptate inventore libero modi cum perspiciatis asperiores. Incidunt voluptate harum odio fugiat nemo!"

let filme = '{"titulo":"Titulo Escolhido", "trailer":"https://www.youtube.com/embed/ZxgPySJkxN8","sinopse":"Lorem aqui", "preco":10.50}'
var filmeJSON = JSON.parse(filme)

filmeJSON.sinopse = textoLorem;

trailer.setAttribute("src",filmeJSON.trailer)
titulo.innerHTML = filmeJSON.titulo
sinopse.innerHTML = (filmeJSON.sinopse).substring(0, 400) + "...";

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
    lista.push({img:filmeJSON.imagem, qtd: value, preco: filmeJSON.preco});
    console.log(lista);
    localStorage.setItem("produtosNoCarrinho", JSON.stringify(lista))
    
}

function getProdutoJSON(){
    var produtoJSON = {img:"", qtd:"", preco:""}
    return produtoJSON;
}