let filmeEscolhido = {titulo:"", img: "", descricao:"", preco:""}
let preferencias = new Array();

if(localStorage.getItem("preferencias") == null){
    preferencias = [
        {titulo:"", img: "", descricao:""}, // 0
        {titulo:"", img: "", descricao:""}, // 1
        {titulo:"", img: "", descricao:""}, // 2
        {titulo:"", img: "", descricao:""}, // 3
    ]
}
else{
    preferencias = JSON.parse(localStorage.getItem("preferencias"))
}

var galeria = document.querySelector("#tabelaPromocoes")

let videos=[ // DONT TOUCH !!!!!!!!!!!!!!!!!!
    {titulo:"Mick",img:"mick.jpg",descricao:"Mick Jagger não exagera ao afirmar que se escrevesse sobre sua vida “em todos os detalhes, as pessoas ficariam aterrorizadas”. Nesta biografia do líder dos Rolling Stones, o jornalista americano Christopher Andersen não poupa fãs e leitores dos detalhes polêmicos e nada glamourosos da trajetória artística e pessoal de um dos astros mais originais do rock contemporâneo.",categoria:"Biografias",ano:2012,preco:89.68},
    {titulo:"Quem somos nós",img:"quem-somos-nos.jpg",descricao:"De que são feitos o pensamento e a realidade? E como um pensamento muda a natureza da realidade? Este livro conduz por meio da ciência para dentro de um universo que é mais vivo do que se pode imaginar - a fronteira final do conhecimento científico sobre a consciência a percepção a química do corpo e a estrutura cerebral. Uma obra sobre física quântica espiritualidade e o significado da vida.",categoria:"Física Quântica",ano:2010,preco:9.50},
    {titulo:"A cura quântica",img:"cura-quantica.jpg",descricao:"Há uma abordagem da medicina na qual a mente, a consciência e a inteligência ocupam papéis principais. Segundo essa vertente, as doenças ocorrem quando nosso corpo vital está ferido.",categoria:"Física Quântica",ano:2019,preco:12.50},
    {titulo:"O Pequeno Príncipe",img:"pequeno-principe.jpg",descricao:"Nesta clássica história que marcou gerações de leitores em todo o mundo, um piloto cai com seu avião no deserto do Saara e encontra um pequeno príncipe, que o leva a uma jornada filosófica e poética através de planetas que encerram a solidão humana. A edição conta com a clássica tradução do poeta imortal dom Marcos Barbosa, e é a versão mais consagrada da obra, publicada no Brasil desde 1952.",categoria:"Infantil",ano:1960,preco:10.50},
    {titulo:"Mick",img:"mick.jpg",descricao:"Mick Jagger não exagera ao afirmar que se escrevesse sobre sua vida “em todos os detalhes, as pessoas ficariam aterrorizadas”. Nesta biografia do líder dos Rolling Stones, o jornalista americano Christopher Andersen não poupa fãs e leitores dos detalhes polêmicos e nada glamourosos da trajetória artística e pessoal de um dos astros mais originais do rock contemporâneo.",categoria:"Biografias",ano:2012,preco:89.68},
    {titulo:"Quem somos nós",img:"quem-somos-nos.jpg",descricao:"De que são feitos o pensamento e a realidade? E como um pensamento muda a natureza da realidade? Este livro conduz por meio da ciência para dentro de um universo que é mais vivo do que se pode imaginar - a fronteira final do conhecimento científico sobre a consciência a percepção a química do corpo e a estrutura cerebral. Uma obra sobre física quântica espiritualidade e o significado da vida.",categoria:"Física Quântica",ano:2010, preco:9.50}
]

for (let i = 0; i < videos.length; i++){
    
    var divVideo = configuraElemento(criarDiv(), "col-sm-6 mt-4", galeria) 
    divVideo.setAttribute("id",i)
    var tituloVideo = configuraElemento(criarTexto(videos[i].titulo, "h5"), "", divVideo)
    var divDetalhes = configuraElemento(criarDiv(), "row", divVideo)
    var link = configuraElemento(criarLink(), "col-sm-4", divDetalhes)
    var divImagem = configuraElemento(criarDiv(), "", link)
    var imagem = configuraElemento(criarImg(videos[i].img), "w-100", divImagem)
    var divSinopse = configuraElemento(criarDiv(), "col-sm-8", divDetalhes);
    var textoSinopse= "Ano: " + videos[i].ano + "<br/>" + "Categoria: " + videos[i].categoria + "<br/>" + videos [i].descricao
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
    element.setAttribute("src", "../imagens/"+caminho)
    return element;
}

function criarLink(){
    var element = document.createElement("a")          // Link que redireciona para singleProdutos
    element.setAttribute("type", "button")
    element.setAttribute("class", "btn btn-light")
    element.onclick = function(){
        selecionarProduto(element);
    }
    return element
}

function selecionarProduto(element){
    var div = element.parentElement;
    var index = div.parentElement.id
    filmeEscolhido.titulo = videos[index].titulo
    filmeEscolhido.img= element.firstChild.firstChild.src
    filmeEscolhido.descricao = videos[index].descricao
    filmeEscolhido.preco = videos[index].preco
    localStorage.setItem("filmeEscolhido", JSON.stringify(filmeEscolhido))
    var confereSePossuiFilmeRepitido = preferencias.filter(lista => lista.titulo == filmeEscolhido.titulo)
    if(!confereSePossuiFilmeRepitido.length){
        preferencias.shift();
        preferencias.push(filmeEscolhido)
    }
    localStorage.setItem("preferencias",JSON.stringify(preferencias))
    location.href="../docs/singlePreferencia.html"
}

function configuraElemento(element, config, destino){
    element.setAttribute("class",config)
    colocarDentro(destino, element)
    return element;
}

function colocarDentro(destino, element){
    destino.appendChild(element)
}