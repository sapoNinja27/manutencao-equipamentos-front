angular.module("sistemaManutencao").controller("homePageCtrl", function ($scope, $location,authAPI,usuarioService,storageAPI) {
	$scope.login = function (credenciais) {
		storageAPI.setLocalUser(null)
	  	authAPI.authenticate(credenciais).then(function (data) {
			usuarioService.getUsuario(credenciais.nome).then(function(user){
				let usuario =user.data;
				let localUser=authAPI.successfulLogin(data.headers("Authorization"),usuario)
				if(localUser!=null){
					$location.path("/menu");
					$location.replace();
				}
			})
		}).catch(function(){
            
        });
	};
});