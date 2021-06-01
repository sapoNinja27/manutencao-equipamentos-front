angular.module("sistemaManutencao").controller("clientePageCtrl", function ($scope, $location,cliente) {
	
    $scope.cliente=cliente.data;
    
    $scope.problemas;
    $scope.imagens;


    $scope.enviar=function(){
        let ordemAtualizada={
            "problemasExtras":$scope.problema
        }
        //upar imagem no s3, upar o probleas com o link das imagens ao ordem,
    }
	
});