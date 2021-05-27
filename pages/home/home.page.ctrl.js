angular.module("sistemaManutencao").controller("homePageCtrl", function ($scope, $location) {
	
	$scope.login = function (credenciais) {
		console.log(credenciais.usuario)
		console.log(credenciais.senha)
		$location.path("/menu");
	};
});