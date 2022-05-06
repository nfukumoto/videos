//caso coloque
console.log("Hello Word")
console.log(document.querySelector("h1"))
//document(documento html)
//querySelector(consulta um elemento html)
document.querySelector("h1").innerHTML+=" >>"
//acesso a um elemento do formulario
console.log(document.forms.formContato)
var formC=document.forms.formContato
//Evento de clique no botão confirmar
document.querySelector("#btContato").onclick=function(){
    //alert("ok")
    if(formC.nomeContato.value==""){
        alert("Preencha o nome!")
    }else if(formC.emailContato.value==""){
        alert("Preencha o email!")
    }else if(formC.comentario.value==""){
        alert("Preencha o comentario!")
    }
}