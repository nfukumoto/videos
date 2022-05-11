window.onload=function(){
    console.log('Testando JS')

    // Escopos de variáveis (var, let (não se repete), const(não altera o valor))
    let videos='{"nome":"Nélio Fukumoto", "idade":44, "email":"neo.nhf@gmail.com", "preferencia":"Mensal", "dataInicio":"01/01/2022", "tipoAssinante":"Lorde", "valor":"R$ 50,00"}'

    console.log(videos)

    let videosJSON=JSON.parse(videos) // Conversão de string para objeto

    console.log(videosJSON)

    let perfil=document.querySelector('#perfil')
    let h3=document.querySelector("#perfil h4")
    let p1=document.querySelector("#p1")
    let p2=document.querySelector("#p2")
    let p3=document.querySelector("#p3")
    let p4=document.querySelector("#p4")
    let p5=document.querySelector("#p5")
    let p6=document.querySelector("#p6")
    //conteudo.innerHTML=videosJSON.tipo
    h3.innerHTML="Nome: " + videosJSON.nome
    p1.innerHTML="Idade: " + videosJSON.idade
    p2.innerHTML="E-mail: " + videosJSON.email
    p3.innerHTML="Preferência: " + videosJSON.preferencia
    p4.innerHTML="Data de inicio: " + videosJSON.dataInicio
    p5.innerHTML="Tipo de Assinante: " + videosJSON.tipoAssinante
    p6.innerHTML="Valor: " + videosJSON.valor
}