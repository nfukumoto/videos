var formC=document.forms.formCadastro
//evento de Clic no botton comfimar
document.querySelector("#btContato").onclick=function(){
   // alert("ok")
    if(formC.nomeContato.value == ""){
       alert("preencha o nome!")
   }else if(formC.emailContato.value ==""){
       alert("preecha o email!")
    }else if(formC.telefone.value == ""){
        alert("preencha o número do telefone")
    }else if(formC.senha.value == ""){
        alert("informe a Senha")
    }else if(formC.confimarSenha.value == ""){
        alert("confirme a Senha")
   }else{ 
       formC.submit()
   }
}