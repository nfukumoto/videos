var formL = document.forms.formLogin;
document.querySelector("#btLogin").onclick=function(){
    if(verificaSeCampoVazio(formL.usuario.value, "usuario"));
    else if(verificaSeFormatoEmail(formL.usuario.value));
    else if(verificaSeCampoVazio(formL.senha.value, "senha"));
    else if(verificaSePossuiTamanhoMinimo(formL.senha.value));
    else{
        localStorage.emailUser=formL.usuario.value // Recupera a informação do email para usar como nome do usuário.
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

function verificaSePossuiTamanhoMinimo(valor){
    if(valor.length < 8){
        alert("A senha deve ter 8 caracteres ou mais !");
        return true;
    }
    return false;
}

function verificaSeFormatoEmail(valor){
    if(valor.indexOf('@') == -1){
        alert("Formato de Email não reconhecido !")
        return true;
    }
    return false
}