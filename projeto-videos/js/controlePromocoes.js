var tabelaPromocoes = document.querySelector("#tabelaPromocoes")

var promocoes = [
    ["Video 1","https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 2","https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 3","https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 4","https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 5","https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 6","https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 7","https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 8","https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"],
    ["Video 9","https://capas-p.imagemfilmes.com.br/164908_000_p.jpg"]
]

for(i=0; i<promocoes.length; i++){
    var promocao = document.createElement("div")
    promocao.setAttribute("class","col-sm-4 mt-3")
    
    
    var titulo = document.createElement("h5")
    titulo.innerText=promocoes[i][0]
    promocao.appendChild(titulo)

    var detalhesPromocao = document.createElement("div")
    detalhesPromocao.setAttribute("class","row")

    var divImagem = document.createElement("div")
    divImagem.setAttribute("class","col-sm-4")

    var imagem = document.createElement("img")
    imagem.setAttribute("src", promocoes[i][1])
    imagem.setAttribute("class", "w-100")
    divImagem.appendChild(imagem)

    var divDescricao = document.createElement("div")
    var sinopse = document.createElement("p")
    sinopse.setAttribute("class","text-dark")
    sinopse.innerHTML="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic enim consequatur repellat atque, quaerat veritatis possimus dolorem vero quae voluptatem nesciunt"
    divDescricao.appendChild(sinopse)
    divDescricao.setAttribute("class","col-sm-8")

    detalhesPromocao.appendChild(divImagem)
    detalhesPromocao.appendChild(divDescricao)

    promocao.appendChild(detalhesPromocao)
    tabelaPromocoes.appendChild(promocao)
}
