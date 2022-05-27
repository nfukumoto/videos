let filmeEscolhido = {titulo:"", img: "", descricao:""}
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


//window.onload=function(){

    // Saudação ao usuário, link para login e sair

    let user= localStorage.emailUser
    let bemVindo=document.querySelector("#bemVindo")
    let entrar=document.querySelector("#entrar")
    let sair=document.querySelector("#sair")
    let cadastrar=document.querySelector("#cadastrar")

    function msgUser(){ // Função para ocultar link entrar quando logado.
        let nomeUser=user.substring(0,user.indexOf('@')) // Pega apenas a informação que está antes do "@" e está dentro da função, pois é quando ela existe.
        bemVindo.innerHTML='Olá <b>' + nomeUser.toUpperCase() + '!</b>'
        entrar.style.display="none"
        cadastrar.style.display="none"
    }

    function resetUser(){ // Função para ocultar link sair quando não estivar logado.
        sair.style.display="none"
    }

    sair.onclick=function(){ // Função que remove o usuário e reinicia a página inicial
        localStorage.removeItem('emailUser')
        location.href='index.html'
    }

    localStorage.emailUser ? msgUser() : resetUser() // Ternário 'if' que verifica o entrar e sair.

    // -------------------------------------------------------------------------------- //

    // Montagem dos elementos da tela com Javascript

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
let galeria=document.querySelector("#galeria")
// Lógica de iteração para o consumo do array
carregaGaleria()

function carregaGaleria(){
    for(var i=0; i<videos.length; i++){
        // Início da div principal
        
        // Cria um elemento div
        var div=document.createElement('div');
        div.setAttribute("id", i)
        // Adiciona a classe com espaço 4
        div.classList.add('col-sm-4')

        var img = document.createElement("img")
        img.setAttribute("class","w-75")
        img.setAttribute("src", "imagens/" + videos[i].img)

        var link = criarLink()

        link.appendChild(img)
        div.appendChild(link)
        // Galeria recebe div
        galeria.appendChild(div)
    }
}
    

//}

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
    filmeEscolhido.img = element.firstChild.src
    filmeEscolhido.descricao = videos[index].descricao
    filmeEscolhido.preco = videos[index].preco
    localStorage.setItem("filmeEscolhido", JSON.stringify(filmeEscolhido))
    var confereSePossuiFilmeRepitido = preferencias.filter(lista => lista.titulo == filmeEscolhido.titulo)
    if(!confereSePossuiFilmeRepitido.length){
        preferencias.shift();
        preferencias.push(filmeEscolhido)
    }
    localStorage.setItem("preferencias",JSON.stringify(preferencias))
    location.href="docs/singlePreferencia.html"
}