var formR=document.forms.formRegistro;

document.querySelector("#btRegistro").onclick=function(){
    if(verificaSeCampoVazio(formR.nomeUser.value, "nome")){}
    else if(verificaSeCampoVazio(formR.emailUser.value, "email")){}
    else if(verificaSeCampoVazio(formR.dddUser.value, "ddd")){}
    else if(verificaSeCampoVazio(formR.telUser.value, "celular")){}
    else if(verificaSeCampoVazio(formR.senhaUser.value, "senha")){}
    else if(verificaSeCampoVazio(formR.senhaC.value, "confirmação de senha")){}
    else if(verificaSePossuiTamanhoMinimo(formR.senhaUser.value)){}
    else{ 
       verificaSeSenhasConferem(formR.senhaUser.value,formR.senhaC.value)
    }
}

function verificaSeCampoVazio(valor, msg){
    if(valor == ""){
        alert("Preencha o campo " + msg)
        return true
    }
    return false
}

function verificaSeSenhasConferem(senha, senhaC){
    if(senha == senhaC){
        formR.submit()
        return true;
    }
    alert("Senhas Diferentes !")
    return false
}
 function verificaSePossuiTamanhoMinimo(valor){
    if(valor.length < 8){
        alert("A Senha deve Conter 8 Caracteres ou Mais!");
        return true;
    }
    return false;
}
