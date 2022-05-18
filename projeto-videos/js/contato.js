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
        }else if(formC.chamado.checked == false){
            alert('Marque a confirmação!')
        }else{
            alert('Seu chamado foi aberto com sucesso!')
            addChamado()
        }
    }
    

    function addChamado(){
        let id=parseInt(Math.random()*90000 + 10000)
        let valor=new Array 
            valor.push(formC.nomeContato.value)
            valor.push(formC.emailContato.value)
            valor.push(formC.assuntoContato.value)
            valor.push(formC.comentario.value)
        localStorage.setItem('chamado-'+id,JSON.stringify(valor))
    }
}