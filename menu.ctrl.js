angular.module("sistemaManutencao").controller("menuCtrl", function ($route,$scope,usuarioService, $location,storageAPI,authAPI) {

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
    $scope.imagem=function(){
        $scope.user=storageAPI.getLocalUser();
        if($scope.user.profilePicture==null){
            return "res/logo.png"
        }else{
            return $scope.user.profilePicture
        }
    }
    
    $scope.fileChanged = function($event){
        var files = $event.target.files;
        console.log(files)
    }
    $scope.update=function(){
        console.log("sjgshgassasgagsahsdgahhas")
        // let f=document.getElementById('img').files[0];
        //     $scope.user=storageAPI.getLocalUser();
        //     usuarioService.uploadPicture($scope.user.id,f)
        //         .then(function(data){
        //             usuarioService.getUsuarioById($scope.user.id).then(function(data){
        //                 userAux=data.data;
        //                 $scope.user=storageAPI.getLocalUser();
        //                 $scope.user.profilePicture=userAux.imagem;
        //                 authAPI.atualizarImagem($scope.user)
        //                 $scope.mudou=false;
        //                 $route.reload();
        //             })
        //         })
        //         .catch(function(error){
        //             console.log(error)   
        //         })
    }
    
	$scope.deslogar=function(){
        $location.path("/home");
        $location.replace();
    }
    $scope.perfil=function(){
        $location.path("/perfil");
    }
});