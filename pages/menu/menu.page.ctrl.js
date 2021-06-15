angular.module("sistemaManutencao").controller("menuPageCtrl", function ($route,$scope, $location,usuario,storageAPI,authAPI) {
    if(storageAPI.getLocalUser().perfil==null){
        authAPI.atualizarUsuario(usuario.data);
        let menu = false;
        usuario.data.perfil.forEach(perfil => {
            if(perfil=="ADMIN"|| perfil=="RECEPCIONISTA"){
                menu=true
            }
        });
        if(menu){
            $route.reload();
        }else{
            $location.path("/listarPedidos");
        }
    }
    $scope.user=storageAPI.getLocalUser();
    
    
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
    $scope.configurarUser=function(){
        $location.path("/configUser");
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
    $scope.adm=function(){
        let aprovado = false;
        if($scope.user.perfil=="ADMIN"){
            aprovado = true;
        }
        return aprovado;
        
    }
});