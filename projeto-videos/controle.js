var formC=document.forms.formCadastro
document.querySelector("#btCadastro").onclick=function(){
   // alert("ok")
    if(formC.nome.value == ""){
       alert("preencha o nome!")
   }else if(formC.email.value ==""){
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