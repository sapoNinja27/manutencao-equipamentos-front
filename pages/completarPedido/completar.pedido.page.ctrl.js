angular.module("sistemaManutencao").controller("completarPedidoPageCtrl", function ($scope, $location,pedido) {
	
    $scope.pedido=pedido.data;
    
	
});