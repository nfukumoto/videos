let chamadas = new Array();
let chamadasAtendidas = new Array()
if(localStorage.getItem("chamadas") != null){
    chamadas = JSON.parse(localStorage.getItem("chamadas"))
}
if(localStorage.getItem("chamadasAtendidas") != null){
    chamadasAtendidas = JSON.parse(localStorage.getItem("chamadasAtendidas"))
}

var dadosChamada = document.querySelector("#dadosChamado")
let totalAtendidos = document.querySelector("#chAtend")
let totalPendentes = document.querySelector("#chPend")

class Chamada{
    constructor(){
        this.chamadasAtendida = new Array();
        this.chamadasPendentes = new Array();
        this.totalAtendidos = 0;
        this.totalPendentes = 0;
    }

    setChamadasPendentes(chamadas){
        for (let i = 0; i < chamadas.length; i++) {
            this.chamadasPendentes.push(chamadas[i])
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
        
            nome.innerHTML = this.chamadasPendentes[i].nome
            email.innerHTML = this.chamadasPendentes[i].email
            telefone.innerHTML = this.chamadasPendentes[i].comentario
            assunto.innerHTML = this.chamadasPendentes[i].assunto
        
            divDados.appendChild(nome)
            divDados.appendChild(email)
            divDados.appendChild(telefone)
            divDados.appendChild(assunto)
            dadosChamada.appendChild(divDados)
        }
    }

    atualizaTotal(atendidas, pendentes){
        this.totalAtendidos = atendidas.length;
        this.totalPendentes = pendentes.length;
    }

    confirmaAtendimento(atendidas, pendentes){
        var chamadaAtendida = pendentes.shift();
        atendidas.push(chamadaAtendida);
        this.chamadasAtendida = atendidas;
        this.chamadasPendentes = pendentes;
        dadosChamada.firstChild.remove()
    }

};

let chamada = new Chamada();
chamada.setChamadasPendentes(chamadas);
chamada.atualizaTotal(chamadasAtendidas, chamada.chamadasPendentes)

totalAtendidos.innerHTML = chamada.totalAtendidos
totalPendentes.innerHTML = chamada.totalPendentes

let btnConfAtendimento = document.getElementById("confAtendimento")
btnConfAtendimento.onclick = () => {
    chamadasAtendidas.push(chamada.chamadasPendentes[0])
    localStorage.setItem("chamadasAtendidas", JSON.stringify(chamadasAtendidas))

    chamada.confirmaAtendimento(chamada.chamadasAtendida, chamada.chamadasPendentes)
    chamada.atualizaTotal(chamadasAtendidas, chamada.chamadasPendentes)
    totalAtendidos.innerHTML = chamada.totalAtendidos
    totalPendentes.innerHTML = chamada.totalPendentes
    localStorage.setItem("chamadas", JSON.stringify(chamada.chamadasPendentes))
}
