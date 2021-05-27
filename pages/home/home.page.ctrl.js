angular.module("sistemaManutencao").controller("homePageCtrl", function ($scope, $location) {
	
	$scope.login = function (credenciais) {
	  
		$location.path("/menu");
		// if(credenciais.usuario!=null && credenciais.senha !=null){
			// console.log(credenciais.usuario)
			// console.log(credenciais.senha)
			// authAPI.authenticate(credenciais).subscribe(response=>{
			// 	authAPI.successfulLogin(response.headers.get("Authorization"))
			// });
		// 	$location.path("/menu");
		// }
	};
});