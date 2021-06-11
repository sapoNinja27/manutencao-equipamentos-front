angular.module("sistemaManutencao").controller("homePageCtrl", function ($scope, $location,authAPI,usuarioService,storageAPI) {
	
	$scope.login = function (credenciais) {
		storageAPI.setLocalUser(null)
	  	authAPI.authenticate(credenciais).then(function (data) {
			authAPI.successfulLogin(data.headers("Authorization"))
			$location.path("/menu/"+credenciais.nome);
			$location.replace();
		}).catch(function(){
            
        });
	};
});