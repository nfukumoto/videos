    // Escopos de variáveis (var, let (não se repete), const(não altera o valor))
    let infoUsuario='{"nome":"Nélio Fukumoto", "idade":44, "email":"neo.nhf@gmail.com", "tel":"","preferencia":"Mensal", "dataInicio":"01/01/2022", "tipoAssinante":"Lorde", "valor":"R$ 50,00"}'

    console.log(infoUsuario)

    let infoUsuarioJSON=JSON.parse(infoUsuario) // Conversão de string para objeto

    infoUsuarioJSON.nome = localStorage.nomeUser;
    infoUsuarioJSON.email = localStorage.emailUser;
    infoUsuarioJSON.tel = localStorage.telUser;

    let perfil=document.querySelector('#perfil')
    let h3=document.querySelector("#perfil h4")
    let p1=document.querySelector("#p1")
    let p2=document.querySelector("#p2")
    let p3=document.querySelector("#p3")
    let p4=document.querySelector("#p4")
    let p5=document.querySelector("#p5")
    let p6=document.querySelector("#p6")
    let p7=document.querySelector("#p7")
    //conteudo.innerHTML=infoUsuarioJSON.tipo
    h3.innerHTML="Nome: " + infoUsuarioJSON.nome
    p1.innerHTML="Idade: " + infoUsuarioJSON.idade
    p2.innerHTML="E-mail: " + infoUsuarioJSON.email
    p3.innerHTML="Telefone: " + infoUsuarioJSON.tel
    p4.innerHTML="Preferência: " + infoUsuarioJSON.preferencia
    p5.innerHTML="Data de inicio: " + infoUsuarioJSON.dataInicio
    p6.innerHTML="Tipo de Assinante: " + infoUsuarioJSON.tipoAssinante
    p7.innerHTML="Valor: " + infoUsuarioJSON.valor
