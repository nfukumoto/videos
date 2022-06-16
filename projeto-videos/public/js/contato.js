window.onload=function(){
    let chamadas = new Array();
    if(localStorage.getItem("chamadas") != null){
        chamadas = JSON.parse(localStorage.getItem("chamadas"))
    }

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
        }else if(formC.chamado.checked == false){
            alert('Marque a confirmação!')
        }else{
            alert('Seu chamado foi aberto com sucesso!')
            addChamado()
        }
    }
    

    function addChamado(){
        let id=parseInt(Math.random()*90000 + 10000)
        let valor={
            id:id,
            nome:formC.nomeContato.value,
            email:formC.emailContato.value,
            assunto:formC.assuntoContato.value,
            comentario:formC.comentario.value
        }
        chamadas.push(valor)
        localStorage.setItem("chamadas", JSON.stringify(chamadas))
    }
}