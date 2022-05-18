var formC=document.forms.formCadastroprodutos;

document.querySelector("#btCadastroprodutos").onclick=function(){
    if(verificaSeCampoVazio(formC.nomeFilme.value, "nomefilme"));
    else if(verificaSeCampoVazio(formC.categoriaFilme.value, "Categoria"));
    else if(verificaSeCampoVazio(formC.anoFilme.value, "Ano"));
    else if(verificaSeCampoVazio(formC.imagemFilme.value, "Imagem"));
    else if(verificaSeCampoVazio(formC.sinopseFilme.value, "Sinopse"));
       
}

function verificaSeCampoVazio(valor, msg){
    if(valor == ""){
        alert("Preencha o campo " + msg)
        return true
    }
    return false
}