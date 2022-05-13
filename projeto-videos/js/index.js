window.onload=function(){

    // Saudação ao usuário, link para login e sair

    let user= localStorage.emailUser
    let bemVindo=document.querySelector("#bemVindo")
    let entrar=document.querySelector("#entrar")
    let sair=document.querySelector("#sair")

    function msgUser(){ // Função para ocultar link entrar quando logado.
        let nomeUser=user.substring(0,user.indexOf('@')) // Pega apenas a informação que está antes do "@" e está dentro da função, pois é quando ela existe.
        bemVindo.innerHTML='Olá <b>' + nomeUser.toUpperCase() + '!</b>'
        entrar.style.display="none"
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
    var videos=[
        ["Mick","mick.jpg","Mick Jagger não exagera ao afirmar que se escrevesse sobre sua vida “em todos os detalhes, as pessoas ficariam aterrorizadas”. Nesta biografia do líder dos Rolling Stones, o jornalista americano Christopher Andersen não poupa fãs e leitores dos detalhes polêmicos e nada glamourosos da trajetória artística e pessoal de um dos astros mais originais do rock contemporâneo.","Biografias",2012],
        ["Quem somos nós","quem-somos-nos.jpg","De que são feitos o pensamento e a realidade? E como um pensamento muda a natureza da realidade? Este livro conduz por meio da ciência para dentro de um universo que é mais vivo do que se pode imaginar - a fronteira final do conhecimento científico sobre a consciência a percepção a química do corpo e a estrutura cerebral. Uma obra sobre física quântica espiritualidade e o significado da vida.","Física Quântica",2010],
        ["A cura quântica","cura-quantica.jpg","Há uma abordagem da medicina na qual a mente, a consciência e a inteligência ocupam papéis principais. Segundo essa vertente, as doenças ocorrem quando nosso corpo vital está ferido.","Física Quântica",2019],
        ["O Pequeno Príncipe","pequeno-principe.jpg","Nesta clássica história que marcou gerações de leitores em todo o mundo, um piloto cai com seu avião no deserto do Saara e encontra um pequeno príncipe, que o leva a uma jornada filosófica e poética através de planetas que encerram a solidão humana. A edição conta com a clássica tradução do poeta imortal dom Marcos Barbosa, e é a versão mais consagrada da obra, publicada no Brasil desde 1952.","Infantil",1960],
        ["Mick","mick.jpg","Mick Jagger não exagera ao afirmar que se escrevesse sobre sua vida “em todos os detalhes, as pessoas ficariam aterrorizadas”. Nesta biografia do líder dos Rolling Stones, o jornalista americano Christopher Andersen não poupa fãs e leitores dos detalhes polêmicos e nada glamourosos da trajetória artística e pessoal de um dos astros mais originais do rock contemporâneo.","Biografias",2012],
        ["Quem somos nós","quem-somos-nos.jpg","De que são feitos o pensamento e a realidade? E como um pensamento muda a natureza da realidade? Este livro conduz por meio da ciência para dentro de um universo que é mais vivo do que se pode imaginar - a fronteira final do conhecimento científico sobre a consciência a percepção a química do corpo e a estrutura cerebral. Uma obra sobre física quântica espiritualidade e o significado da vida.","Física Quântica",2010]
    ]

    // Galeria faz acesso ao elemento html div com id=galeria
    var galeria=document.querySelector("#galeria")
    // Lógica de iteração para o consumo do array
    for(var i=0; i<videos.length; i++){
        // Início da div principal
        
        // Cria um elemento div
        var div=document.createElement('div');
        // Adiciona a classe com espaço 4
        div.classList.add('col-sm-4')
        // Cria um elemnto div par o conteudo
        var conteudo=document.createElement('div')
        // Define como linha para inserir as colunas abaixo
        conteudo.className='row'

        var descricao=(videos[i][2]).substring(0,90) + '...'

        var categoria='<p class="text-uppercase">Categoria: ' + videos[i][3] + '</p>'
        var anoPub='<p>Ano: ' + videos[i][4] + '</p>'
        // Insere o parágrafo com variáveis da categoria, ano e resenha dentro de uma div com espaço 7
        var resenha='<div class="col-sm-7"><p>' + categoria + anoPub + '<p>' + descricao + '</p></div>'

        // Insere o tag h3 com o título
        conteudo.innerHTML+='<h3 class="col-sm-12 mt-4 mb-2">' + videos[i][0] + '</h3>'
        // Insere a imagem com 100% dentro de uma div com espaço 5
        conteudo.innerHTML+='<div class="col-sm-5"><img src="imagens/' + videos[i][1] + '" class="w-100" /></div>'

        conteudo.innerHTML+=resenha

        // Div recebe conteúdo
        div.appendChild(conteudo)
        // Galeria recebe div
        galeria.appendChild(div)
    }
}