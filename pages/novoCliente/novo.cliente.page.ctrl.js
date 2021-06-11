angular.module("sistemaManutencao").controller("novoClientePageCtrl", function ($scope, $location,clienteService) {
	
    $scope.nome;
    $scope.rg;
    $scope.cpf;
    $scope.bairro;
    $scope.cidade;
    $scope.telefone;
    $scope.email;

	$scope.adicionar=function(){
         let newCliente={
            "nome": $scope.nome,
            "telefone": $scope.telefone,
            "rg":$scope.rg,
            "email": $scope.email,
            "cpf": $scope.cpf,
            "bairro": $scope.bairro,
            "cidade": $scope.cidade
         }
         clienteService.addCliente(newCliente).then(function (data) {
			$location.path("/menu");
		}).catch(function(){
            
        });
    }
});