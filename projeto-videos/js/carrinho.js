var produtosJSON = [
    {img:"https://capas-p.imagemfilmes.com.br/164908_000_p.jpg", qtd:3, preco:10.50},
    {img:"https://capas-p.imagemfilmes.com.br/164908_000_p.jpg", qtd:7, preco:2.50},
    {img:"https://capas-p.imagemfilmes.com.br/164908_000_p.jpg", qtd:5, preco:7.50},
]

carregaProdutosNoLayout(produtosJSON)
carregaResumoNoLayout(produtosJSON)
carregaTitulosRelacionados(produtosJSON);

// ========================== Funções Auxiliares ==========================//

function carregaProdutosNoLayout(produtos){
    var produtosAdquiridosJSON = getElementJSON();
    produtosAdquiridosJSON.element = document.querySelector("#produtosAdquiridos")

    for (let i = 0; i < produtos.length; i++) {
    
        var produtoJSON = configuraElemento(criarDivJSON("row"), produtosAdquiridosJSON)
    
        var divImagemJSON = configuraElemento(criarDivJSON("col-sm-4"), produtoJSON);
        var divQtdJSON = configuraElemento(criarDivJSON("col-sm-4"), produtoJSON);
        var divPrecoJSON = configuraElemento(criarDivJSON("col-sm-4"),produtoJSON);
    
        var imagemJSON = configuraElemento(configurarImgProduto(produtos[i].img), divImagemJSON); 
        var qtdJSON = configuraElemento(configurarQtdProduto(produtos[i].qtd), divQtdJSON);
        var precoJSON = configuraElemento(configurarPrecoProduto(produtos[i].preco), divPrecoJSON);
        
        produtosAdquiridosJSON.element.appendChild(document.createElement("hr"))
    }
}

function getElementJSON(){
    var elementJSON = '{"element":"", "class":"", "destino":""}'
    return JSON.parse(elementJSON);
}

function criarDivJSON(classe){
    var elementJSON = getElementJSON();
    elementJSON.element = criarDiv();
    elementJSON.class = classe;
    
    return elementJSON;
}

function configurarImgProduto(caminho){
    var elementJSON = getElementJSON();
    elementJSON.element = criarImg(caminho)
    elementJSON.class = "w-75 mt-2"

    return elementJSON;
}

function configurarQtdProduto(quantidade){
    var elementJSON = getElementJSON();
    elementJSON.element = criarTexto(quantidade, "h4")
    elementJSON.class = "text-dark mt-5"
    
    return elementJSON;
}

function configurarPrecoProduto(preco){
    var elementJSON = getElementJSON();
    elementJSON.element = criarTexto("R$ " + (preco.toFixed(2)).toString().replace(".",","), "h4")
    elementJSON.class = "text-dark mt-5"

    return elementJSON;
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

function configuraElemento(elementJSON, destino){
    (elementJSON.element).setAttribute("class", elementJSON.class)
    elementJSON.destino = destino.element
    colocarDentro(destino.element, elementJSON.element)

    return elementJSON;
}

function colocarDentro(destino, element){
    destino.appendChild(element)
}

function carregaResumoNoLayout(produtos){
    var resumoCompraJSON = getElementJSON();
    resumoCompraJSON.element = document.querySelector("#resumoCompra")

    var totalProdutos = 0;
    var totalCompra = 0;

    for(var i = 0; i < produtos.length; i++){
        totalProdutos += produtos[i].qtd;
        totalCompra += produtos[i].qtd * produtos[i].preco
    }

    var divResumo = configuraElemento(criarDivJSON(""), resumoCompraJSON)
    var paragrafoResumoJSON = getElementJSON();
    var paragrafo = totalProdutos + " Produtos<br>"+"Total R$ "+(totalCompra.toFixed(2)).toString().replace(".",",");
    paragrafoResumoJSON.element = criarTexto(paragrafo,"p");
    configuraElemento(paragrafoResumoJSON, divResumo)
}

function carregaTitulosRelacionados(produtos){
    var titulosRelacionados = getElementJSON();
    titulosRelacionados.element = document.querySelector("#produtos")
    for(var i = 0; i < produtos.length; i++){
        var divImg = configuraElemento(criarDivJSON("col-sm-4"), titulosRelacionados)
        var imagem = getElementJSON();
        imagem.element = criarImg(produtos[i].img);
        imagem.class = "w-100"
        imagem = configuraElemento(imagem, divImg)
    }
}