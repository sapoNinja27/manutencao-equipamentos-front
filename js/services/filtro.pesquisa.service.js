angular.module("sistemaManutencao").service("pesquisaAPI", function () {
    //recebe uma palavra e uma lista para ser filtrada, retorna essa lista filtrada com base na palavra
    this.filtrar=function (palavra,clientes) {
        lista=[];
        novaLista=[]
        for(let i=0;i<clientes.length;i++){
            for(let j=0;j<palavra.length;j++){
                lista[i]=0;
                //aqui esta filtrando pelo nome, da pra fazer uma verificação generica para identificar os campos que contem letras e filtrar eles, mas nao 
                //ha nescessidade
                if(clientes[i].nome.includes(palavra)){
                    lista[i]=clientes[i].id;
                    novaLista=atualizar(lista);
                }else{
                    lista[i]=null
                    novaLista=atualizar(lista);
                }
            }
        }
        novaLista=refazerLista(novaLista,clientes);
        return novaLista;
      }
      //funciona de forma parecida, so que foi feita para filtrar por numero de cpf ou rg
      this.filtrarNumero=function (palavra,clientes) {
        lista=[];
        novaLista=[]
        for(let i=0;i<clientes.length;i++){
            for(let j=0;j<palavra.length;j++){
                lista[i]=0;
                //aqui ocorre a filtragem
                if(clientes[i].cpf.includes(palavra) || clientes[i].rg.includes(palavra)){
                    lista[i]=clientes[i].id;
                    novaLista=atualizar(lista);
                }else{
                    lista[i]=null
                    novaLista=atualizar(lista);
                }
            }
        }
        novaLista=refazerLista(novaLista,clientes);
        return novaLista;
      }
    //essa função recebe a lista filtada de ids e transforma em uma lista sem espaços vazios
    var atualizar=function(lista){
    let palavras="";
    for(let i=0;i<lista.length;i++){
        if(lista[i]!=null){
            palavras+=":"+lista[i];
        }
    }
    palavrasArray=palavras.split(":");
    clientesFiltrados=[];
    for(let i=1;i<palavrasArray.length;i++){
        clientesFiltrados[i-1]=palavrasArray[i]
    }
    return clientesFiltrados;
    }
    //essa funçao recebe a lista sem espaços vazios e adiciona os valores da lista original
      var refazerLista=function(listaNova,listaVelha){
        for(let i=0;i<listaNova.length;i++){
            for(let j=0;j<listaVelha.length;j++){
                if(listaNova[i]==listaVelha[j].id){
                    listaNova[i]=null;
                    listaNova[i]=listaVelha[j];
                }
            }
        }
        return listaNova;
      }
});