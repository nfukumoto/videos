var formL=document.forms.formLogin
//Evento de clique no botão confirma

document.querySelector("#btLogin").onclick=function(){
    //alert("ok")
    if(formL.email.value==""){
        alert("Preencha o e-mail!")
    }else if(formL.senha.value==""){
        alert("Preencha a senha!")
    }else{
          
            formL.submit()
        }
        document.querySelector("#btLogin").onclick=function(){
            
        }
    }
    