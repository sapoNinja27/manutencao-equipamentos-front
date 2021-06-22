angular.module("sistemaManutencao").controller("tabelaClientesPageCtrl", function ($scope,formatadorAPI,pesquisaAPI, $location, clientes) {
    $scope.clientes=clientes.data;
    $scope.clientesFiltrados=$scope.clientes;
    $scope.analizar=function(cliente_id){
        active=0;
        clicked=false;
        $location.path("/cliente/"+cliente_id);
        $location.replace();
    }
    let clicked;
    let active;
    let hover;
    $scope.filtrar=function (palavra) {
        $scope.nome=formatadorAPI.formatar(palavra);
        palavra=formatadorAPI.formatar(palavra);
        if(palavra.length==0){
            $scope.clientesFiltrados=$scope.clientes;
        }else{
            $scope.clientesFiltrados=pesquisaAPI.filtrar(palavra,$scope.clientes);
        }
      }
      $scope.style=function(index){
          let value = "item"
          if(!clicked){
            if(index==hover){
              value+=" hover"
            }
          }else{
            if(index==active){
                value+=" active"
              }
          }
          return value
      }
      $scope.hoverIn=function (index) {
        hover=index;
      }
      $scope.mouseDown=function (index) {
        clicked=true;
        active=index;
      }
      $scope.hoverOut=function(){
          hover=0;
          active=0;
          clicked=false;
      }
});