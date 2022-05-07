var formL = document.forms.formLogin;
document.querySelector("#btLogin").onclick=function(){
    if(verificaSeCampoVazio(formL.usuario.value, "usuario")){}
    else if(verificaSeCampoVazio(formL.senha.value, "senha")){}
    else{
        formL.submit();
    }
}

function verificaSeCampoVazio(valor, msg){
    if(valor==""){
        alert("Preencha o campo " + msg);
        return true;
    }
    return false;
}