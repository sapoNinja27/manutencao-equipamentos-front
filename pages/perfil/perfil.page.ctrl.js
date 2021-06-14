angular.module("sistemaManutencao").controller("perfilPageCtrl", function ($scope, $location,usuarioService,storageAPI) {
	
    $scope.user=storageAPI.getLocalUser();
    console.log( $scope.user.id)
	$scope.voltar=function(){
        $location.path("/menu");
        $location.replace();
    }
    $scope.atualizarSenha=function(senha){

        usuarioNovo={
            "senha":senha
        }
        let id =$scope.user.id;
        usuarioService.atualizar(id,usuarioNovo).then(function (data) {
            $location.path("/menu");
            $location.replace();
		}).catch(function(){
            
        });
    }
});