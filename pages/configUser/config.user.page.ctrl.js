angular.module("sistemaManutencao").controller("configUserPageCtrl", function ($scope,$location,pesquisaAPI,storageAPI,$route,usuarios,usuarioService) {
    var analize=false;
    //funçao para prevenir que o botao de voltarleve para o menu principal se a tela de alterar usuario estiver aberta
    //ao invez disso ele voltara para a tela de listar usuarios
    $scope.$on('$routeChangeStart', function(event, next, current) {
        if(next.originalPath=="/menu"){
            if(analize){
                analize=false;
                $location.path("/configUser");
            }else{
                $location.path("/menu");
                $location.replace();
            }
        }
    });
    $scope.usuarios=usuarios.data;
    $scope.cargos=[
        "TECNICO",
        "ANALISTA",
        "RECEPCIONISTA"
    ]
    let cargos=[];
    let cargosNormais=[];
    let cargoADM="ADM";
    let localUser=storageAPI.getLocalUser();
    let clicked;
    let active;
    let hover;
    $scope.usuariosFiltrados=$scope.usuarios;
    $scope.campo='nome';
    $scope.direcao=false;
    $scope.orderBy=function(campo){
        $scope.campo=campo;
        $scope.direcao=!$scope.direcao;
    }
    for(let i=0; i<$scope.usuarios.length;i++){
        if(localUser.nome==$scope.usuarios[i].nome){
            $scope.usuarios.splice(i, 1);
        }
    }
    $scope.voltar=function(){
        $scope.analizando=false;
        $route.reload();
    }
    $scope.analizar=function(usuario){
        active=0;
        clicked=false;
        analize=true;
        $scope.analizando=true;
        $scope.usuario=usuario;
    }
      $scope.style=function(index){
          let value = "item"
          if(!clicked){
            if(index==hover){
              value+=" hover"
            }
          }else{
            if(index==active){
                value+=" active"
              }
          }
          return value
      }
      $scope.hoverIn=function (index) {
        hover=index;
      }
      $scope.mouseDown=function (index) {
        clicked=true;
        active=index;
      }
      $scope.hoverOut=function(){
          hover=0;
          active=0;
          clicked=false;
      }
    $scope.novoUsuario=function(){
        $scope.adicionando=true;
    }
    $scope.tabela=function(){
        if(!$scope.analizando && !$scope.adicionando){
            return true;
        }
        return false;
    }
    $scope.adicionarUsuario=function(user){
        usuarioNovo={
            "nome":user.nome
        }
        usuarioService.adicionar(usuarioNovo).then(function (data) {
            $scope.adicionando=false;
            $route.reload();
		}).catch(function(){
            
        });
    }
    $scope.adicionarCargo=function(car){
        let novo=true;
        let array=""
        for(let i=0;i<cargosNormais.length;i++){
            if(cargosNormais[i]==car){
                novo=false;
            }else{
                array+=":"+cargosNormais[i];
            }
        }
        if(novo){
            cargosNormais.push(car);
        }else{
            cargosNormais=[];
            arrays=array.split(":")
            for(let i=1;i<arrays.length;i++){
                cargosNormais.push(arrays[i]);
            }
        }
        cargos=cargosNormais;
    }
    //funçao para previnir que o adm tenha mais de um cargo
    $scope.attAdm=function(){
        $scope.adm=!$scope.adm
        cargos=[]
        if($scope.adm){
            cargos[0]=cargoADM
        }else{
            cargos=cargosNormais;
        }
    }
    //aqui é feita uma configuraçao para receber os novos cargos
    $scope.att=function(){
        let numCargos=[];
        for(let i=0;i<cargos.length;i++){
            if(cargos[i]=="ADM"){
                numCargos.push(4)
            }
            if(cargos[i]=="RECEPCIONISTA"){
                numCargos.push(1)
            }
            if(cargos[i]=="ANALISTA"){
                numCargos.push(2)
            }
            if(cargos[i]=="TECNICO"){
                numCargos.push(3)
            }
        }
        let user={
            "perfis":numCargos
        }
        usuarioService.attCargo($scope.usuario.id,user).then(function (data) {
            $scope.analizando=false;
            $route.reload();
		}).catch(function(){
            
        });
    }
    $scope.excluir=function(){
        usuarioService.excluir($scope.usuario.id).then(function (data) {
            $scope.analizando=false;
            $route.reload();
		}).catch(function(){
            
        });
    }
    $scope.filtrar=function (palavra) {
        if(palavra.length==0){
            $scope.usuariosFiltrados=$scope.usuarios;
        }else{
            $scope.usuariosFiltrados=pesquisaAPI.filtrar(palavra,$scope.usuarios);
        }
      }
});