angular.module("sistemaManutencao").controller("novoPedidoPageCtrl", function ($scope, $location) {
	

    $scope.clientes=[{
        nome:"joao"
    },{
        nome:"pedro"
    }]
    $scope.clientesFiltrados=$scope.clientes;
    $scope.nome=""
    
    $scope.show=false;
    
    
    $scope.selecionar=function(nome) {
        $scope.nome=nome;
    }
    
    $scope.toggle=function() {
        $scope.show=true;
      }
      
    $scope.filtrar=function (palavra) {
        console.log(palavra)
        $scope.clientesFiltrados=[]
        for(let i=0;i<$scope.clientes.length;i++){
            if($scope.clientes[i].nome.includes(palavra)){
                $scope.clientesFiltrados[i]=$scope.clientes[i];
            }
        }
      }
	
});