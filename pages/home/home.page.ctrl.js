angular.module("sistemaManutencao").controller("homePageCtrl", function ($scope, $location,authAPI) {
	
	$scope.login = function (credenciais) {
	  

		authAPI.authenticate(credenciais).then(function (data) {
			authAPI.successfulLogin(data.headers("Authorization"))
			$location.path("/menu");
		});
	};
});