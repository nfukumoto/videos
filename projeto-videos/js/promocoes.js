var galeria = document.querySelector("#tabelaPromocoes")
var textoLorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est suscipit ipsa vel in laborum delectus nihil officiis optio repudiandae aliquam?"

var videos = [
    ["Video 1", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 2", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 3", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 4", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 5", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 6", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 7", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 8", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 9", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
]

for (let i = 0; i < videos.length; i++){
    
    var divVideo = configuraElemento(criarDiv(), "col-sm-4 mt-4", galeria)
    var tituloVideo = configuraElemento(criarTexto(videos[i][0], "h5"), "", divVideo)
    var divDetalhes = configuraElemento(criarDiv(), "row", divVideo)
    var link = configuraElemento(criarLink("singleProduto.html"), "col-sm-4", divDetalhes)
    var divImagem = configuraElemento(criarDiv(), "", link)
    var imagem = configuraElemento(criarImg(videos[i][1]), "w-100", divImagem)
    var divSinopse = configuraElemento(criarDiv(), "col-sm-8", divDetalhes);
    var sinopse = configuraElemento(criarTexto(textoLorem,"p"), "text-dark", divSinopse)
}


function criarDiv(){
    var element = document.createElement("div")
    return element;
}

function criarTexto(valor, tipo){
    var element = document.createElement(tipo)
    element.innerHTML=valor;
    return element;
}

function criarImg(caminho){
    var element = document.createElement("img")
    element.setAttribute("src", caminho)
    return element;
}

function criarLink(caminho){
    var element = document.createElement("a")
    element.setAttribute("href", caminho)
    return element;
}

function configuraElemento(element, config, destino){
    element.setAttribute("class",config)
    colocarDentro(destino, element)
    return element;
}

function colocarDentro(destino, element){
    destino.appendChild(element)
}