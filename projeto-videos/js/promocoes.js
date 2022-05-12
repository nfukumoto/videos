var galeria = document.querySelector("#tabelaPromocoes")
var textoLorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est suscipit ipsa vel in laborum delectus nihil officiis optio."
var videos = [
    ["Video 1", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg",textoLorem,"Ação",2019],
    ["Video 2", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg",textoLorem,"Policial",2021],
    ["Video 3", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg",textoLorem,"Aventura",2022],
    ["Video 4", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg",textoLorem,"Terror",2019],
    ["Video 5", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg",textoLorem,"Infantil",2022],
    ["Video 6", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg",textoLorem,"Séries",2020],
    ["Video 7", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg",textoLorem,"Entretenimento",2022],
    ["Video 8", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg",textoLorem,"Documentário",2022],
    ["Video 9", "https://capas-p.imagemfilmes.com.br/164908_000_p.jpg",textoLorem,"Shows",2021],
]

for (let i = 0; i < videos.length; i++){
    
    var divVideo = configuraElemento(criarDiv(), "col-sm-4 mt-4", galeria) 

    var tituloVideo = configuraElemento(criarTexto(videos[i][0], "h5"), "", divVideo)
    var divDetalhes = configuraElemento(criarDiv(), "row", divVideo)
    var link = configuraElemento(criarLink("singleProduto.html"), "col-sm-4", divDetalhes)
    var divImagem = configuraElemento(criarDiv(), "", link)
    var imagem = configuraElemento(criarImg(videos[i][1]), "w-100", divImagem)
    var divSinopse = configuraElemento(criarDiv(), "col-sm-8", divDetalhes);
    var textoSinopse= "Ano: " + videos[i][4] + "<br/>" + "Categoria: " + videos[i][3] + "<br/>" + videos [i][2]
    var sinopse = configuraElemento(criarTexto(textoSinopse,"p"), "text-dark", divSinopse)
   
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