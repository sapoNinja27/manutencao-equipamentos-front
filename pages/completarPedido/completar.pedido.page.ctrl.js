angular.module("sistemaManutencao").controller("completarPedidoPageCtrl", function ($scope, $location,pedido) {
	
    $scope.pedido=pedido.data;
    
    $scope.problemas;
    $scope.imagens;


    $scope.enviar=function(){
        let ordemAtualizada={
            "problemasExtras":$scope.problema
        }
        //upar imagem no s3, upar o probleas com o link das imagens ao ordem,
    }
	
});