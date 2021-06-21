angular.module("sistemaManutencao").controller("menuCtrl", function ($scope, $location,storageAPI) {
    $scope.home=function(){
        if($location.path()=="/home"){
            return false
        }else{
            let pagina=$location.path();
            pagina=pagina.split("/")[1]
            if(pagina=="menu"){
                $scope.pagina= "Menu Principal"
            }else if(pagina=="adicionarPedido"){
                $scope.pagina= "Nova Manutenção"
            }else if(pagina=="adicionarCliente"){
                $scope.pagina= "Novo Cliente"
            }else if(pagina=="listarClientes"){
                $scope.pagina= "Clientes"
            }else if(pagina=="listarPedidos"){
                $scope.pagina= "Manutenções"
            }else if(pagina=="configUser"){
                $scope.pagina= "Configuração de Usuarios"
            }else if(pagina=="pedido"){
                $scope.pagina= "Manutenção"
            }else if(pagina=="cliente"){
                $scope.pagina= "Editar Cliente"
            }else if(pagina=="perfil"){
                $scope.pagina= "Editar Perfil"
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
            return true;
        }
    }
    $scope.usuario=function(){
        if($scope.user==null){
            return "vazio"
        }
        return $scope.user.nomeNormal
    }
    $scope.imagem=function(){
        $scope.user=storageAPI.getLocalUser();
        if($scope.user==null){
            return "res/logo.png"
        }else if($scope.user.imagem==null){
            return "res/logo.png"
        }
        return $scope.user.imagem
    }
    $scope.deslogar=function(){
        $location.path("/home");
        $location.replace();
    }
    $scope.perfil=function(){
        $location.path("/perfil");
    }
});