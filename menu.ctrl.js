angular.module("sistemaManutencao").controller("menuCtrl", function ($scope, $location,storageAPI) {

    



    if(storageAPI.getLocalUser()!=null){
        $scope.user=storageAPI.getLocalUser();
        if($scope.user.perfil=="ADMIN"){
            $scope.cargo="Administrador";
            $scope.descricao="Acesso total ao aplicativo";
        }else{
            $scope.user.perfil.forEach(perfil => {
                if(perfil=="RECEPCIONISTA"){
                    $scope.cargo="Recepcionista";
                    $scope.descricao="Funções restritas a recepcionista";
                }else if(perfil=="ANALISTA"&&$scope.cargo!="Recepcionista"){
                    $scope.cargo="Analista";
                    $scope.descricao="Analizar e liberar pedidos";
                }else if(perfil=="TECNICO"&&$scope.cargo!="Recepcionista"&&$scope.cargo!="Analista"){
                    $scope.cargo="Tecnico";
                    $scope.descricao="Finalizar pedidos";
                }
            });
        }
    }
    $scope.home=function(){
        if($location.path()=="/home"){
            return false
        }
        return true;
    }
	$scope.deslogar=function(){
        $location.path("/home");
        $location.replace();
    }
    // $scope.perfil=function(){
    //     $location.path("/perfil");
    // }
});