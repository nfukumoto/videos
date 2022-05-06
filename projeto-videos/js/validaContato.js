var formC=document.forms.formContato;
document.querySelector("#btContato").onclick=function(){
    if(verificaSeCampoVazio(formC.nomeContato.value, "nome"));
    else if(verificaSeCampoVazio(formC.emailContato.value, "email"));
    else if(verificaSeCampoVazio(formC.comentario.value, "comentário"));
    else{ 
       formC.submit()
    }
}

function verificaSeCampoVazio(valor, msg){
    if(valor == ""){
        alert("Preencha o campo " + msg)
        return true
    }
    return false
}