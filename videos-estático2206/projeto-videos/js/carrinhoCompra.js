var resumoCompraJSON = getElementJSON()
resumoCompraJSON.element = document.querySelector("#resumoCompra")
let carrinho = {
    produtos:new Array(),
    numProdutos:0,
    totalProduto:0,
    totalCompra:0,
    esvaziarCarrinho:function(){
        localStorage.removeItem("produtosNoCarrinho")
        location.href="carrinhoCompra.html"
    },
    excluirItem:function(element){
        var child = element.parentElement.parentElement;
        var parent = child.parentElement
        carrinho.produtos.splice(child.id,1)
        localStorage.setItem("produtosNoCarrinho", JSON.stringify(this.produtos))
        child.remove()
        location.href="carrinhoCompra.html"
    },
    multiplicarTelas:function(produto){
        this.numProdutos += parseInt(produto.qtd)
        this.totalProduto = produto.preco * (1.07)**(produto.qtd-1)
        return this.totalProduto
    },
    montarResumo:function(){
        resumoCompraJSON.element.innerHTML=''
        var divResumo = configuraElemento(criarDivJSON(""), resumoCompraJSON)
        var paragrafoResumoJSON = getElementJSON();
        var paragrafo = "Tem "+carrinho.numProdutos+" Produto(s) no carrinho.<br>"+"Total R$ "+(carrinho.totalCompra.toFixed(2)).toString().replace(".",",")
        console.log(paragrafoResumoJSON.element)
        paragrafoResumoJSON.element = criarTexto(paragrafo,"p")
        paragrafoResumoJSON.element.setAttribute('id','pResumoJSON')
        configuraElemento(paragrafoResumoJSON, divResumo)
    }
}

let cupom = {
}

carrinho.produtos=JSON.parse(localStorage.produtosNoCarrinho)
if(carrinho.produtos.length)
{
    carregaProdutosNoLayout(carrinho.produtos)
    carregaResumoNoLayout(carrinho.produtos)
    carregaTitulosRelacionados(carrinho.produtos)
}


// ========================== Funções Auxiliares ==========================//

function carregaProdutosNoLayout(produtos){
    var produtosAdquiridosJSON = getElementJSON();
    produtosAdquiridosJSON.element = document.querySelector("#produtosAdquiridos")

    for (let i = 0; i < produtos.length; i++) {
    
        var produtoJSON = configuraElemento(criarDivJSON("row"), produtosAdquiridosJSON)
        produtoJSON.element.setAttribute("id",i)
    
        var divImagemJSON = configuraElemento(criarDivJSON("col-sm-4 mt-2 text-center"), produtoJSON)
        var divQtdJSON = configuraElemento(criarDivJSON("col-sm-3 mt-2 text-center"), produtoJSON)
        var divPrecoJSON = configuraElemento(criarDivJSON("col-sm-3 mt-2 text-center"),produtoJSON)
        var divLixeiraJSON = configuraElemento(criarDivJSON("col-sm-2 mt-1 text-center"), produtoJSON)

        var imagemJSON = configuraElemento(configurarImgProduto(produtos[i].img), divImagemJSON)
        var qtdJSON = configuraElemento(configurarQtdProduto(produtos[i].qtd), divQtdJSON)
        var precoJSON = configuraElemento(configurarPrecoProduto(produtos[i].preco), divPrecoJSON)
        var lixeira = configuraElemento(configuraLixeira(i), divLixeiraJSON)
        produtosAdquiridosJSON.element.appendChild(document.createElement("hr"))
    }

    var btnEsvaziarJSON = getElementJSON()
    var btnEsvaziar = document.createElement("button")
    btnEsvaziar.innerHTML= "Excluir Itens"
    btnEsvaziar.setAttribute("type", "button")
    btnEsvaziar.onclick = function(){
        carrinho.esvaziarCarrinho()
    }

    btnEsvaziarJSON.class = "btn btn-danger w-100"
    btnEsvaziarJSON.element = btnEsvaziar
    configuraElemento(btnEsvaziarJSON, produtosAdquiridosJSON)
}

function getElementJSON(){
    var elementJSON = '{"element":"", "class":"", "destino":""}'
    return JSON.parse(elementJSON)
}

function criarDivJSON(classe){
    var elementJSON = getElementJSON()
    elementJSON.element = criarDiv()
    elementJSON.class = classe
    return elementJSON
}

function configurarImgProduto(caminho){
    var elementJSON = getElementJSON()
    elementJSON.element = criarImg(caminho)
    elementJSON.class = "w-75"
    return elementJSON
}

function configurarQtdProduto(quantidade){
    var elementJSON = getElementJSON()
    elementJSON.element = document.createElement('input')
    elementJSON.element.value = quantidade
    elementJSON.element.setAttribute('type','number')
    elementJSON.element.setAttribute('min',1)
    elementJSON.element.setAttribute('max',5)
    elementJSON.class = "form-control w-50 mx-auto text-center"
    elementJSON.element.onchange=function(){
        alteraQuantidade(elementJSON.element.parentElement.parentElement.id,elementJSON.element)
    }
    return elementJSON
}

function configurarPrecoProduto(preco){
    var elementJSON = getElementJSON()
    elementJSON.element = criarTexto("R$ " + (preco.toFixed(2)).toString().replace(".",","), "h4")
    elementJSON.class = "text-dark"
    return elementJSON
}

function criarDiv(){
    var element = document.createElement("div")
    return element
}

function criarTexto(valor, tipo){
    var element = document.createElement(tipo)
    element.innerHTML=valor
    return element
}

function criarImg(caminho){
    var element = document.createElement("img")
    element.setAttribute("src", caminho)
    return element
}

function configuraLixeira(index){
    var elementJSON = getElementJSON()
    var element = document.createElement("a")
    var imagem = document.createElement("img")
    imagem.setAttribute("src","../imagens/lixeira.png")
    imagem.setAttribute("style","width:25px")
    element.appendChild(imagem)
    element.setAttribute("type", "button")
    element.onclick = function(){
        if(confirm('Você tem certeza?')){
            carrinho.excluirItem(element)
        }
    }
    elementJSON.element = element;
    elementJSON.class = "btn btn-light"
    return elementJSON
}

function configuraElemento(elementJSON, destino){
    (elementJSON.element).setAttribute("class", elementJSON.class)
    elementJSON.destino = destino.element
    colocarDentro(destino.element, elementJSON.element)
    return elementJSON
}

function colocarDentro(destino, element){
    destino.appendChild(element)
}

function carregaResumoNoLayout(produtos){
    carrinho.numProdutos=0
    carrinho.totalProduto=0
    carrinho.totalCompra=0
    for(var i = 0; i < produtos.length; i++){
        carrinho.totalCompra += carrinho.multiplicarTelas(produtos[i])
    }
    carrinho.montarResumo()
}

function carregaTitulosRelacionados(produtos){
    var titulosRelacionados = getElementJSON()
    titulosRelacionados.element = document.querySelector("#produtos")
    for(var i = 0; i < produtos.length; i++){
        var divImg = configuraElemento(criarDivJSON("col-sm-4"), titulosRelacionados)
        var imagem = getElementJSON()
        imagem.element = criarImg(produtos[i].img)
        imagem.class = "w-100"
        imagem = configuraElemento(imagem, divImg)
    }
}

let btnCupom = document.querySelector('#btnCupom')
btnCupom.onclick=function(){
    var inputCupom = document.querySelector('#cupom')
    if (inputCupom.value == 123){
        alert('Cupom validado! Você ganhou 10% de desconto')
        carrinho.totalCompra = carrinho.totalCompra * 0.9
        var paragrafo = document.querySelector('#pResumoJSON')
        paragrafo.innerHTML="Tem "+carrinho.numProdutos + " Produto(s) no carrinho.<br>"+"Total com desconto R$ "+(carrinho.totalCompra.toFixed(2)).toString().replace(".",",")
    }else if(inputCupom.value == 456 ){
        alert('Cupom validado! Você ganhou 20% de desconto')
        carrinho.totalCompra = carrinho.totalCompra * 0.8
        var paragrafo = document.querySelector('#pResumoJSON')
        console.log(paragrafo)
        paragrafo.innerHTML="Tem "+carrinho.numProdutos + " Produto(s) np carrinho.<br>"+"Total com desconto R$ "+(carrinho.totalCompra.toFixed(2)).toString().replace(".",",")
    }else{
        alert('Cupom inválido!')
    }
}

function alteraQuantidade(index,element){
    carrinho.produtos[index].qtd=element.value
    carregaResumoNoLayout(carrinho.produtos)
}