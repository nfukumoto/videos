window.onload=function(){
    var formC=document.forms.formContato
    document.querySelector("#btContato").onclick=function(){
        if(formC.nomeContato.value == ""){
            alert("Preencha o nome!")
        }else if(formC.emailContato.value ==""){
            alert("Preecha o email!")
        }else if(formC.assuntoContato.value ==""){
            alert("Preecha o assunto!")            
        }else if(formC.comentario.value == ""){
            alert("Preencha o comentario!")
        }else{ 
            formC.submit()
        }
    }
}