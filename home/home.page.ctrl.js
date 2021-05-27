angular.module("sistemaManutencao").controller("homePageCtrl", function ($scope, $location) {
	
	$scope.login = function (credenciais) {
		console.log(credenciais.usuario)
		console.log(credenciais.senha)
		// contatosAPI.saveContato(contato).success(function (data) {
		// 	delete $scope.contato;
		// 	$scope.contatoForm.$setPristine();
		$location.path("/menu");
		// });
	};
});