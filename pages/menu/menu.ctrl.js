angular.module("sistemaManutencao").controller("menuCtrl", function ($scope,$route,usuarioService, $location,storageAPI,localUserAPI) {
    //os valores da pagina estao protegidos com a verificação de se o usuario estiver vazio, para evitar a quebra da aplicação caso de algum erro
    $scope.home=function(){
        if($location.path()=="/home"){
            return false
        }else{
            let user=storageAPI.getLocalUser();
            if(user == undefined || user == null || user.perfil==null || user.perfil=="" || user.perfil==undefined){
                $location.path("/home");
                $location.replace();
                $route.reload();
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
                if(user.perfil=="ADMIN"){
                    $scope.cargo="Administrador";
                    $scope.descricao="Acesso total ao aplicativo";
                }else{
                    user.perfil.forEach(perfil => {
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
            return true;
        }
    }
    $scope.upload=function(){
        let icon= $scope.img[0];
        let user=storageAPI.getLocalUser();
        usuarioService.uploadPicture(user.id,icon)
            .then(function(data){
                usuarioService.getUsuarioById(user.id).then(function(data){
                    localUserAPI.atualizarImagem(data.data.imagem)
                    $scope.img=null;
                    $route.reload();
                })
            })
            .catch(function(error){
                
            })
    }
    $scope.usuario=function(){
        let user=storageAPI.getLocalUser();
        if(user==null){
            return "vazio"
        }
        return user.nomeNormal
    }
    $scope.imagem=function(){
        let user=storageAPI.getLocalUser();
        if(user==null){
            return "res/logo.png"
        }else if(user.imagem==null){
            return "res/logo.png"
        }
        return user.imagem
    }
    $scope.menu=function(){
        $location.path("/menu");
        $location.replace();
    }
    $scope.deslogar=function(){
        $location.path("/home");
        $location.replace();
    }
    $scope.perfil=function(){
        $location.path("/perfil");
    }
});