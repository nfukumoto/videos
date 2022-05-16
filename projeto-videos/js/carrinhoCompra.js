let produtosJSON = new Array();
produtosJSON=JSON.parse(localStorage.produtosNoCarrinho);
if(produtosJSON.length)
{
    carregaProdutosNoLayout(produtosJSON)
    carregaResumoNoLayout(produtosJSON)
    carregaTitulosRelacionados(produtosJSON);
}


// ========================== Funções Auxiliares ==========================//

function carregaProdutosNoLayout(produtos){
    var produtosAdquiridosJSON = getElementJSON();
    produtosAdquiridosJSON.element = document.querySelector("#produtosAdquiridos")

    for (let i = 0; i < produtos.length; i++) {
    
        var produtoJSON = configuraElemento(criarDivJSON("row"), produtosAdquiridosJSON)
        produtoJSON.element.setAttribute("id",i)
    
        var divImagemJSON = configuraElemento(criarDivJSON("col-sm-4"), produtoJSON);
        var divQtdJSON = configuraElemento(criarDivJSON("col-sm-3"), produtoJSON);
        var divPrecoJSON = configuraElemento(criarDivJSON("col-sm-3"),produtoJSON);
        var divLixeiraJSON = configuraElemento(criarDivJSON("col-sm-2 mt-4"), produtoJSON);

        var imagemJSON = configuraElemento(configurarImgProduto(produtos[i].img), divImagemJSON); 
        var qtdJSON = configuraElemento(configurarQtdProduto(produtos[i].qtd), divQtdJSON);
        var precoJSON = configuraElemento(configurarPrecoProduto(produtos[i].preco), divPrecoJSON);
        var lixeira = configuraElemento(configuraLixeira(i), divLixeiraJSON);
        
        produtosAdquiridosJSON.element.appendChild(document.createElement("hr"))
    }

    var btnEsvaziarJSON = getElementJSON();
    var btnEsvaziar = document.createElement("button")
    btnEsvaziar.innerHTML= "Excluir Itens"
    btnEsvaziar.setAttribute("type", "button");
    btnEsvaziar.onclick = function(){
        localStorage.removeItem("produtosNoCarrinho")
        location.href="carrinhoCompra.html";
    }

    btnEsvaziarJSON.class = "btn btn-danger w-100";
    btnEsvaziarJSON.element = btnEsvaziar;
    configuraElemento(btnEsvaziarJSON, produtosAdquiridosJSON)
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

function configuraLixeira(index){
    var elementJSON = getElementJSON();
    var element = document.createElement("a");
    var imagem = document.createElement("img");
    imagem.setAttribute("src","../imagens/lixeira.png")
    imagem.setAttribute("class","w-50")
    element.appendChild(imagem)
    element.setAttribute("type", "button")
    element.onclick = function(){
        var child = element.parentElement.parentElement;
        var parent = child.parentElement;
        produtosJSON.splice(child.id,1);
        localStorage.setItem("produtosNoCarrinho", JSON.stringify(produtosJSON))
        child.remove()
        location.href="carrinhoCompra.html"
    }
    elementJSON.element = element;
    elementJSON.class = "btn btn-light"
    return elementJSON
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
        totalProdutos += parseInt(produtos[i].qtd);
        totalCompra += parseFloat(produtos[i].qtd) * parseFloat(produtos[i].preco)
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