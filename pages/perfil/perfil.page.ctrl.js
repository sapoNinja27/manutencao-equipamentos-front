angular.module("sistemaManutencao").controller("perfilPageCtrl", function ($scope,authAPI, $location,usuarioService,storageAPI) {
	
    $scope.user=storageAPI.getLocalUser();
	$scope.voltar=function(){
        $location.path("/menu");
        $location.replace();
    }
    $scope.checar=function(senha){

        if(senha.confirmar!=senha.nova){
            $scope.diferente=true;
        }else{
            $scope.diferente=false;
        }
        
        if(senha.nova.match(new RegExp("[0-9]")) 
            && senha.nova.match(new RegExp("[a-z]")) 
            && senha.nova.match(new RegExp("[A-Z]"))){
            $scope.incorreto=false;
        }else{
            $scope.incorreto=true;
        }
        if(!senha.nova.match(new RegExp("[0-9]"))){
            $scope.erro1="Numero";
        }else{
            $scope.erro1="";
        }
        if(!senha.nova.match(new RegExp("[a-z]")) ){
            $scope.erro2="Letra Minuscula";
        }else{
            $scope.erro2="";
        }
        if(!senha.nova.match(new RegExp("[A-Z]"))){
            $scope.erro3="Letra Maisuscula";
        }else{
            $scope.erro3="";
        }




        if(senha.confirmar=="" || senha.confirmar==null){
            $scope.diferente=false;
        }
        if(senha.nova==""|| senha.nova==null){
            $scope.incorreto=false;
        }
    }
    $scope.atualizarSenha=function(senha){

        credenciais={
            "nome":$scope.user.nome,
            "senha": senha.antiga
        }

        authAPI.authenticate(credenciais).then(function (data) {
            if(senha.confirmar==senha.nova){
                usuarioNovo={
                    "senha":senha.nova
                }
                let id =$scope.user.id;
                usuarioService.atualizar(id,usuarioNovo).then(function (data) {
                    $location.path("/menu");
                    $location.replace();
                }).catch(function(){
                    alert("Formato de senha invalido")
                });
            }else{
                alert("Senhas são diferentes")
            }
		}).catch(function(){
            alert("Senha incorreta")
        });
        
    }
});