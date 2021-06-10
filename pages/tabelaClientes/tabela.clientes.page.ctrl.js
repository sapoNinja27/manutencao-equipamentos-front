angular.module("sistemaManutencao").controller("tabelaClientesPageCtrl", function ($scope, $location, clientes) {
	
    $scope.clientes=clientes.data;
	
    $scope.clientesFiltrados=$scope.clientes;

    $scope.analizar=function(cliente_id){
        $location.path("/cliente/"+cliente_id);
        $location.replace();
    }
    $scope.filtrar=function (palavra) {
        if(palavra.length==0){
            $scope.clientesFiltrados=$scope.clientes;
        }
        novaLista=[]
        for(let i=0;i<$scope.clientes.length;i++){
            novaLista[i]={nome: ""}
            for(let j=0;j<palavra.length;j++){
                if($scope.clientes[i].nome.charAt(j)==palavra.charAt(j)){
                    novaLista[i].nome=$scope.clientes[i].nome;
                    novaLista[i].cpf=$scope.clientes[i].cpf;
                    atualizar(novaLista);
                }else{
                    novaLista[i]={nome: ""}
                    atualizar(novaLista);
                }
            }
        }
      }
      var atualizar=function(lista){
        let palavras="";
        for(let i=0;i<lista.length;i++){
            if(lista[i].nome!=""){
                palavras+="´"+lista[i].nome+"^"+lista[i].cpf;
            }
        }
        palavrasArray=palavras.split("´");
        $scope.clientesFiltrados=[];
        for(let i=1;i<palavrasArray.length;i++){
            value=palavrasArray[i].split("^");
            $scope.clientesFiltrados[i-1]={
                nome:value[0],
                cpf:value[1]
            }
        }
      }
});