let assinaturas = [
    {cliente:"João",desc:"Lorem ipsum assinatura blablabla",valor:98.50},
    {cliente:"Maria",desc:"Lorem ipsum assinatura blablabla",valor:102.45},
    {cliente:"José",desc:"Lorem ipsum assinatura blablabla",valor:37.99}
]

let somaTotAss = 0

let tabAssinaturas = document.querySelector('#tabAssinaturas')
let totAssinTab = document.querySelector('#totalAssinaturasTab')
let AssinaturasJSON = (assinaturas)

for(var i=0;i<assinaturas.length;i++){
    var linhaTab = document.createElement('tr')
tabAssinaturas.appendChild(linhaTab)

    var dTabCliente = document.createElement('td')
    var dTabDesc = document.createElement('td')
    var dTabValor = document.createElement('td')

    linhaTab.appendChild(dTabCliente)
    linhaTab.appendChild(dTabDesc)
    linhaTab.appendChild(dTabValor)

    dTabCliente.innerHTML=AssinaturasJSON[i].cliente
    dTabDesc.innerHTML=AssinaturasJSON[i].desc
    dTabValor.innerHTML=(AssinaturasJSON[i].valor.toFixed(2)).toString().replace('.',',')

    somaTotAss += AssinaturasJSON[i].valor
}

document.querySelector('#totalAssinaturasTab').innerHTML=somaTotAss.toFixed(2).toString().replace('.',',')
///////////////////////////////////////////////////////////

let aluguel = [
    {cliente:"João",desc:"Lorem ipsum alug blablabla",valor:9.50},
    {cliente:"Maria",desc:"Lorem ipsum alug blablabla",valor:10.45},
    {cliente:"José",desc:"Lorem ipsum alug blablabla",valor:30.99}
]

let somaTotAlug = 0

let tabAluguel = document.querySelector('#tabAluguel')
let totAlugTab = document.querySelector('#totalAluguelTab')
let AluguelJSON = (aluguel)

for(var i=0;i<aluguel.length;i++){
    var linhaTab = document.createElement('tr')
    tabAluguel.appendChild(linhaTab)

    var dTabCliente = document.createElement('td')
    var dTabDesc = document.createElement('td')
    var dTabValor = document.createElement('td')

    linhaTab.appendChild(dTabCliente)
    linhaTab.appendChild(dTabDesc)
    linhaTab.appendChild(dTabValor)

    dTabCliente.innerHTML=AluguelJSON[i].cliente
    dTabDesc.innerHTML=AluguelJSON[i].desc
    dTabValor.innerHTML=(AluguelJSON[i].valor.toFixed(2)).toString().replace('.',',')

    somaTotAlug += AluguelJSON[i].valor
}

document.querySelector('#totalAluguelTab').innerHTML=somaTotAlug.toFixed(2).toString().replace('.',',')

document.querySelector('#numAssinantes').innerHTML=AssinaturasJSON.length
document.querySelector('#totalAssinantes').innerHTML=somaTotAss
document.querySelector('#numAlugados').innerHTML=AluguelJSON.length
document.querySelector('#totalAlugados').innerHTML=somaTotAlug