var divInformacoes = document.forms.formInfo.informacoes;

var informacoesJSON = getInfoUserJASON();
informacoesJSON = defineValueJSON(informacoesJSON);

setName(informacoesJSON.nome);
setYears(informacoesJSON.idade);
setEmail(informacoesJSON.email);
setPreference(informacoesJSON.preferencia);
setDate(informacoesJSON.dataInicio);
setUserType(informacoesJSON.tipoAssinante);
setValue(informacoesJSON.valor);

function getInfoUserJASON(){
    var infoJSON = '{"nome":"","idade":"","email":"","preferencia":"","dataInicio":"", "tipoAssinante":"","valor":""}'
    return JSON.parse(infoJSON);
}

function defineValueJSON(infoJSON)
{
    infoJSON.nome = "Kayke Amorim Tavares Martins"
    infoJSON.idade = 18
    infoJSON.email = "kaykeamorim@gmail.com"
    infoJSON.preferencia = "Ação"
    infoJSON.dataInicio = "10/05/2022"
    infoJSON.tipoAssinante = "Premium"
    infoJSON.valor = 50

    return infoJSON;
}

function setName(value){
    document.querySelector("#nome").innerHTML+=value;
}

function setYears(value){
    document.querySelector("#idade").innerHTML+=value + " anos";
}

function setEmail(value){
    document.querySelector("#email").innerHTML+=value;
}

function setPreference(value){
    document.querySelector("#preferencia").innerHTML+=value;
}

function setDate(value){
    document.querySelector("#dataInicio").innerHTML+=value;
}

function setUserType(value){
    document.querySelector("#tipoAssinante").innerHTML+=value;
}

function setValue(value){
    document.querySelector("#valor").innerHTML+="R$ "+ (value.toFixed(2)).toString().replace(".", ",");
}