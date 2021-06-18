angular.module("sistemaManutencao").controller("tabelaClientesPageCtrl", function ($scope,pesquisaAPI, $location, clientes) {
    $scope.clientes=clientes.data;
    $scope.clientesFiltrados=$scope.clientes;
    $scope.analizar=function(cliente_id){
        $location.path("/cliente/"+cliente_id);
        $location.replace();
    }
    $scope.filtrar=function (palavra) {
        if(palavra.length==0){
            $scope.clientesFiltrados=$scope.clientes;
        }else{
            $scope.clientesFiltrados=pesquisaAPI.filtrar(palavra,$scope.clientes);
        }
      }
});