let chamadas = Object.keys(localStorage)
chamadas = chamadas.filter(lista => lista.slice(0,8) == "chamado-")

var dadosChamada = document.querySelector("#dadosChamado")

let chamadasPendentes = new Array();

for (let i = 0; i < chamadas.length; i++) {
    chamadasPendentes.push(JSON.parse(localStorage.getItem(chamadas[i])))
    var nome = document.createElement("span")
    var email = document.createElement("span")
    var telefone = document.createElement("span")
    var assunto = document.createElement("span")
    var divDados = document.createElement("div")

    divDados.setAttribute("class","col-sm-12 row")
    divDados.setAttribute("id","divDados"+i)
    nome.setAttribute("class","col-sm-3")
    email.setAttribute("class","col-sm-3")
    telefone.setAttribute("class","col-sm-3")
    assunto.setAttribute("class","col-sm-3")

    nome.innerHTML = chamadasPendentes[i][0]
    email.innerHTML = chamadasPendentes[i][1]
    telefone.innerHTML = chamadasPendentes[i][2]
    assunto.innerHTML = chamadasPendentes[i][3]

    divDados.appendChild(nome)
    divDados.appendChild(email)
    divDados.appendChild(telefone)
    divDados.appendChild(assunto)

    dadosChamada.appendChild(divDados)
}

