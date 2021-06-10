angular.module("sistemaManutencao").controller("menuPageCtrl", function ($scope, $location,usuario,storageAPI,authAPI) {
    if(storageAPI.getLocalUser().perfil ==null){
        authAPI.atualizarUsuario(usuario.data);
    }
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
	$scope.deslogar=function(){
        $location.path("/home");
    }
    $scope.perfil=function(){
        $location.path("/perfil");
    }
    $scope.novoPedido=function(){
        $location.path("/adicionarPedido");
    }
    $scope.novoCliente=function(){
        $location.path("/adicionarCliente");
    }
	$scope.tabelaPedido=function(){
        $location.path("/listarPedidos");
    }
    $scope.tabelaCliente=function(){
        $location.path("/listarClientes");
    }
    $scope.acessoRestrito=function(){
        let aprovado = false;
        if($scope.user.perfil=="ADMIN"){
            aprovado = true;
        }else{
            $scope.user.perfil.forEach(perfil => {
                if(perfil=="RECEPCIONISTA"){
                    aprovado= true;
                }
            });
        }
        return aprovado;
        
    }
});