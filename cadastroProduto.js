var formR=document.forms.formRegistro;

document.querySelector("#btCadastroprodutos").onclick=function(){
    if(verificaSeCampoVazio(formR.nomeFilme.value, "nomefilme"));
    else if(verificaSeCampoVazio(formR.categoriaFilme.value, "Categoria"));
    else if(verificaSeCampoVazio(formR.anoFilme.value, "Ano"));
    else if(verificaSeCampoVazio(formR.sinopseFilme.value, "Sinopse"));
    else if(verificaSeCampoVazio(formR.imagemFilme.value, "Imagem"));
    
    
}

function verificaSeCampoVazio(valor, msg){
    if(valor == ""){
        alert("Preencha o campo " + msg)
        return true
    }
    return false
}


   