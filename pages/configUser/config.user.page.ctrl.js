angular.module("sistemaManutencao").controller("configUserPageCtrl", function ($scope,storageAPI, $location,usuarios) {
    $scope.usuarios=usuarios.data;
	
    let localUser=storageAPI.getLocalUser();
    let achou=false;
    $scope.usuariosFiltrados=[]
    for(let i=0; i<$scope.usuarios.length;i++){
        if(localUser.nome==$scope.usuarios[i].nome){
            achou=true;
        }
        if(achou){
            $scope.usuariosFiltrados[i-1]=$scope.usuarios[i];
        }else{
            $scope.usuariosFiltrados[i]=$scope.usuarios[i];
        }
    }

    // $scope.analizar=function(usuarios_id){
    //     $location.path("/cliente/"+cliente_id);
    //     $location.replace();
    // }
    
});