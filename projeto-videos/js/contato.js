window.onload=function(){

    //Atribuindo o acesso ao formContato para a variável formC
    var formC=document.forms.formContato

    //Evento de clique no botão confirmar
    document.querySelector("#btContato").onclick=function(){
        if(formC.nomeContato.value==""){
            alert("Preencha o nome!")
        }else if (formC.emailContato.value==""){
            alert("Preencha o e-mail!")
        }else if (formC.assuntoContato.value==""){
            alert("Preencha o assunto!")            
        }else if(formC.comentario.value==""){
            alert("Preencha o comentário!")
        }else{
            formC.submit()
        }
    }
}