angular.module("sistemaManutencao").service("pesquisaAPI", function () {
    this.filtrar=function (palavra,clientes) {
        lista=[];
        novaLista=[]
        for(let i=0;i<clientes.length;i++){
            for(let j=0;j<palavra.length;j++){
                lista[i]=0;
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
      this.filtrarNumero=function (palavra,clientes) {
        lista=[];
        novaLista=[]
        for(let i=0;i<clientes.length;i++){
            for(let j=0;j<palavra.length;j++){
                lista[i]=0;
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