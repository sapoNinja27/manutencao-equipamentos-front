angular.module("sistemaManutencao").controller("tabelaPedidosPageCtrl", function ($scope, $location,pedidos) {
	$scope.pedidos=pedidos.data;
    


    $scope.analizar=function(pedido_id){
        $location.path("/pedido/"+pedido_id);
    }

    
	
});