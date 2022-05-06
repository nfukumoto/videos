var formC=document.forms.formCadastro
//evento de Clic no botton comfimar
document.querySelector("#btContato").onclick=function(){
   // alert("ok")
    if(formC.nomeContato.value == ""){
       alert("preencha o nome!")
   }else if(formC.emailContato.value ==""){
       alert("preecha o email!")
   }else if(formC.comentario.value == ""){
     alert("preencha o comentario")
   }else{ 
       formC.submit()
   }
}