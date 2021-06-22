angular.module("sistemaManutencao").service("pesquisaAPI", function () {
    this.filtrar=function (palavra,clientes) {
        lista=[];
        novaLista=[]
        for(let i=0;i<clientes.length;i++){
            lista[i]={nome: ""}
            for(let j=0;j<palavra.length;j++){
                if(clientes[i].nome.includes(palavra)){
                    lista[i].nome=clientes[i].nome;
                    lista[i].cpf=clientes[i].cpf;
                    novaLista=atualizar(lista);
                }else{
                    lista[i]={nome: ""}
                    novaLista=atualizar(lista);
                }
            }
        }
        return novaLista;
      }
       var atualizar=function(lista){
        let palavras="";
        for(let i=0;i<lista.length;i++){
            if(lista[i].nome!=""){
                palavras+="´"+lista[i].nome+"#"+i+"^"+lista[i].cpf;
            }
        }
        palavrasArray=palavras.split("´");
        clientesFiltrados=[];
        for(let i=1;i<palavrasArray.length;i++){
            value=palavrasArray[i].split("^");
            id=value[0].split("#")[1];
            clientesFiltrados[i-1]={
                id: parseInt(id)+1,
                nome:value[0].split("#")[0],
                cpf:value[1]
            }
        }
        return clientesFiltrados;
      }
});