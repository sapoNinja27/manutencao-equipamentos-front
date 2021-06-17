angular.module("sistemaManutencao").controller("menuPageCtrl", function ($scope, $location,storageAPI) {
    
    $scope.user=storageAPI.getLocalUser();
    if( $scope.user.perfil=="ADMIN"){

    }else{
        let rec=false
        $scope.user.perfil.forEach(perfil => {
            if(perfil=="RECEPCIONISTA"){
                rec=true;
            }
        });
        if(!rec){
            $location.path("/listarPedidos");
        }
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