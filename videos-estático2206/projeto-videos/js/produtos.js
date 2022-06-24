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

let trailers = [
    "https://www.youtube.com/embed/rsQEor4y2hg",
    'https://www.youtube.com/embed/094n7ami6N0',
    'https://www.youtube.com/embed/5DrcREFWblA',
    'https://www.youtube.com/embed/jsgd_jVH83',
    'https://www.youtube.com/embed/ivIwdQBlS10',
    'https://www.youtube.com/embed/bldAkEUANWA',
    'https://www.youtube.com/embed/wITUolzfkwI',
    'https://www.youtube.com/embed/PJza3ZaFeAU',
    'https://www.youtube.com/embed/8Ik0iKJbK1A',
    'https://www.youtube.com/embed/KD7R3qLIWkQ',
    'https://www.youtube.com/embed/4rXR4z4cfzg',
    'https://www.youtube.com/embed/pLLuHeWu-TE',
    'https://www.youtube.com/embed/FKy5DyTEnj4'
]

let trailersParaUso = trailers;

window.onload=function(){

    let trailer1 = document.querySelector("#trailer1");
    let trailer2 = document.querySelector("#trailer2");
    let trailer3 = document.querySelector("#trailer3");

    var index1 = parseInt(Math.random()*trailersParaUso.length)
    var link1 = trailersParaUso[index1]
    trailersParaUso.splice(index1,1)

    var index2 = parseInt(Math.random()*trailersParaUso.length)
    var link2 = trailersParaUso[index2]
    trailersParaUso.splice(index2,1)

    var index3 = parseInt(Math.random()*trailersParaUso.length)
    var link3 = trailersParaUso[index3]
    trailersParaUso.splice(index3,1)
    
    trailer1.setAttribute("src", link1)
    trailer2.setAttribute("src", link2)
    trailer3.setAttribute("src", link3)

    //Declaração do array videos com 3 posições: 0=título; 1=imagem; 2=resenha; 3=categoria; 4=ano
let videos=[ // DONT TOUCH !!!!!!!!!!!!!!!!!!
    {titulo:"Mick",img:"mick.jpg",descricao:"Mick Jagger não exagera ao afirmar que se escrevesse sobre sua vida “em todos os detalhes, as pessoas ficariam aterrorizadas”. Nesta biografia do líder dos Rolling Stones, o jornalista americano Christopher Andersen não poupa fãs e leitores dos detalhes polêmicos e nada glamourosos da trajetória artística e pessoal de um dos astros mais originais do rock contemporâneo.",categoria:"Biografias",ano:2012,preco:89.68},
    {titulo:"Quem somos nós",img:"quem-somos-nos.jpg",descricao:"De que são feitos o pensamento e a realidade? E como um pensamento muda a natureza da realidade? Este livro conduz por meio da ciência para dentro de um universo que é mais vivo do que se pode imaginar - a fronteira final do conhecimento científico sobre a consciência a percepção a química do corpo e a estrutura cerebral. Uma obra sobre física quântica espiritualidade e o significado da vida.",categoria:"Física Quântica",ano:2010,preco:9.50},
    {titulo:"A cura quântica",img:"cura-quantica.jpg",descricao:"Há uma abordagem da medicina na qual a mente, a consciência e a inteligência ocupam papéis principais. Segundo essa vertente, as doenças ocorrem quando nosso corpo vital está ferido.",categoria:"Física Quântica",ano:2019,preco:12.50},
    {titulo:"O Pequeno Príncipe",img:"pequeno-principe.jpg",descricao:"Nesta clássica história que marcou gerações de leitores em todo o mundo, um piloto cai com seu avião no deserto do Saara e encontra um pequeno príncipe, que o leva a uma jornada filosófica e poética através de planetas que encerram a solidão humana. A edição conta com a clássica tradução do poeta imortal dom Marcos Barbosa, e é a versão mais consagrada da obra, publicada no Brasil desde 1952.",categoria:"Infantil",ano:1960,preco:10.50},
    {titulo:"Mick",img:"mick.jpg",descricao:"Mick Jagger não exagera ao afirmar que se escrevesse sobre sua vida “em todos os detalhes, as pessoas ficariam aterrorizadas”. Nesta biografia do líder dos Rolling Stones, o jornalista americano Christopher Andersen não poupa fãs e leitores dos detalhes polêmicos e nada glamourosos da trajetória artística e pessoal de um dos astros mais originais do rock contemporâneo.",categoria:"Biografias",ano:2012,preco:89.68},
    {titulo:"Quem somos nós",img:"quem-somos-nos.jpg",descricao:"De que são feitos o pensamento e a realidade? E como um pensamento muda a natureza da realidade? Este livro conduz por meio da ciência para dentro de um universo que é mais vivo do que se pode imaginar - a fronteira final do conhecimento científico sobre a consciência a percepção a química do corpo e a estrutura cerebral. Uma obra sobre física quântica espiritualidade e o significado da vida.",categoria:"Física Quântica",ano:2010, preco:9.50}
]

    // Galeria faz acesso ao elemento html div com id=galeria
    var galeria=document.querySelector("#galeria")
    // Lógica de iteração para o consumo do array
    for(var i=0; i<videos.length; i++){
        // Início da div principal
        
        // Cria um elemento div
        var div=document.createElement('div');
        div.setAttribute("id",i)
        // Adiciona a classe com espaço 6
        div.classList.add('col-sm-6')
        // Cria um elemnto div para o conteudo
        var conteudo=document.createElement('div')
        // Define como linha para inserir as colunas abaixo
        conteudo.className='row'

        var descricao=(videos[i].descricao).substring(0,90) + '...'

        var categoria='<p class="text-uppercase">Categoria: ' + videos[i].categoria + '</p>'
        var anoPub='<p>Ano: ' + videos[i].ano + '</p>'
        // Insere o parágrafo com variáveis da categoria, ano e resenha dentro de uma div com espaço 7
        var resenha='<div class="col-sm-7"><p>' + categoria + anoPub + '<p>' + descricao + '</p></div>'

        // Insere o tag h3 com o título
        conteudo.innerHTML+='<h3 class="col-sm-12 mt-4 mb-2">' + videos[i].titulo + '</h3>'
        // Insere a imagem com 100% dentro de uma div com espaço 5
        var link = criarLink();
        var source = "../imagens/" + videos[i].img
        var imagem = document.createElement("img")
        imagem.setAttribute("src",source)
        imagem.setAttribute("class","w-100")
        var divImagem = document.createElement('div')
        divImagem.setAttribute("class","col-sm-5")
        divImagem.appendChild(imagem)
        conteudo.appendChild(divImagem)

        conteudo.innerHTML+=resenha
        link.appendChild(conteudo)
        // Div recebe conteúdo
        div.appendChild(link)
        // Galeria recebe div
        galeria.appendChild(div)
    }

    // Galeria2 faz acesso ao elemento html div com id=galeria2
    var galeria2=document.querySelector("#galeria2")
    // Lógica de iteração para o consumo do array
    /*for(var i=0; i<3; i++){ // O array está travado em 3 elementos
        // Início da div principal
        
        // Cria um elemento div
        var div2=document.createElement('div2');
        // Adiciona a classe com espaço 4
        div2.classList.add('col-sm-4')
        // Cria um elemnto div para o conteudo
        var conteudo=document.createElement('div2')
        // Define como linha para inserir as colunas abaixo
        conteudo.className='row'

        // Insere a imagem com 100% dentro de uma div com espaço 5
        conteudo.innerHTML+='<div class="col-sm-10 mt-5 mb-2"><a href = "singleProduto.html"><img src="../imagens/' + videos[i].img + '" class="w-100" /></a></div>'

        // Div recebe conteúdo
        div2.appendChild(conteudo)
        // Galeria recebe div
        galeria2.appendChild(div2)
    }    */

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
        var index = div.id
        filmeEscolhido.titulo = videos[index].titulo
        filmeEscolhido.img= element.firstChild.children[1].firstChild.src
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
}