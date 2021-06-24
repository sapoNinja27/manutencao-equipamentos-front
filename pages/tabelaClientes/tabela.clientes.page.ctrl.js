angular.module("sistemaManutencao").controller("tabelaClientesPageCtrl", function ($scope,formatadorAPI,pesquisaAPI, $location, clientes) {
  var vizualizarCliente=false;
    $scope.$on('$routeChangeStart', function(event, next, current) {
        if(next.originalPath=="/cliente/:id_cliente" && !vizualizarCliente){
            $location.path("/menu/");
        }
    });
    $scope.clientes=clientes.data;
    $scope.clientesFiltrados=$scope.clientes;
    $scope.analizar=function(cliente_id){
      vizualizarCliente=true;
        active=0;
        clicked=false;
        $location.path("/cliente/"+cliente_id);
    }
    let clicked;
    let active;
    let hover;
    $scope.filtrar=function (palavra) {
      if(palavra.length==0){
        $scope.clientesFiltrados=$scope.clientes;
      }else{
        if(palavra[0].match(/[0-9]+/g)){
          $scope.clientesFiltrados=pesquisaAPI.filtrarNumero(palavra,$scope.clientes);
        }else{
          $scope.nome=formatadorAPI.formatar(palavra);
          palavra=formatadorAPI.formatar(palavra);
          $scope.clientesFiltrados=pesquisaAPI.filtrar(palavra,$scope.clientes);
        }
      }
    }
    $scope.orderByNome=function(){
      $scope.direcao=!$scope.direcao;
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