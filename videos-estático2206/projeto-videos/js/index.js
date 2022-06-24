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
    {titulo:"Batman",img:"batman.jpg",descricao:"Batman (The Batman, no original) segue o segundo ano de Bruce Wayne (Robert Pattinson) como o herói de Gotham, causando medo nos corações dos criminosos da sombria cidade.",categoria:"Ação",ano:2022,preco:15.00},
    {titulo:"terremoto",img:"terremoto.jpg",descricao:"Um geólogo corre contra o tempo para salvar sua esposa e dois filhos quando um terremoto devastador atinge Oslo, na Noruega.",categoria:"Drama",ano:2020,preco:9.50},
    {titulo:"Red - Crescer é uma fera",img:"red.jpg",descricao:"Meimei é uma adolescente que tem uma herança dos ancestrais.",categoria:"Infantil",ano:2022,preco:12.50},
    {titulo:"Moonfall - Ameaça Lunar",img:"moonfall.jpg",descricao:"A Lua sai da órbita e se desloca para a Terra. ",categoria:"Ficção",ano:2022,preco:10.50},
    {titulo:"Mulher Maravilha",img:"maravilha.jpg",descricao:"Treinada desde cedo para ser uma guerreira imbatível, Diana Prince nunca saiu da paradisíaca ilha em que é reconhecida como princesa das Amazonas.",categoria:"Ação",ano:2017,preco:19.68},
    {titulo:"Homem Formiga",img:"formiga.jpg",descricao:"Em 1989, o Homem-Formiga original, Hank Pym, demite-se da S.H.I.E.L.D. depois de descobrir que a organização tentou duplicar sua tecnologia de encolhimento que faz com que o Homem-Formiga seja possível.",categoria:"Ação",ano:2015, preco:9.50}
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