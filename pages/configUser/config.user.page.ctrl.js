angular.module("sistemaManutencao").controller("configUserPageCtrl", function ($scope,storageAPI,$route,usuarios,usuarioService) {
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
    let achou=false;
    $scope.usuariosFiltrados=[]
    for(let i=0; i<$scope.usuarios.length;i++){
        if(localUser.nome==$scope.usuarios[i].nome){
            $scope.usuarios.splice(i, 1);
        }
    }
    $scope.usuariosFiltrados=$scope.usuarios;
    $scope.analizar=function(usuario){
        $scope.analizando=true;
        $scope.usuario=usuario;
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
    $scope.attAdm=function(){
        $scope.adm=!$scope.adm
        cargos=[]
        if($scope.adm){
            cargos[0]=cargoADM
        }else{
            cargos=cargosNormais;
        }
    }
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
        }
        novaLista=[]
        for(let i=0;i<$scope.usuarios.length;i++){
            novaLista[i]={nome: "", perfil:[]}
            for(let j=0;j<palavra.length;j++){
                if($scope.usuarios[i].nome.charAt(j)==palavra.charAt(j)){
                    novaLista[i].nome=$scope.usuarios[i].nome;
                    novaLista[i].perfil[0]=$scope.usuarios[i].perfil[0];
                    atualizar(novaLista);
                }else{
                    novaLista[i]={nome: "", perfil:[]}
                    atualizar(novaLista);
                }
            }
        }
      }
      var atualizar=function(lista){
        let palavras="";
        for(let i=0;i<lista.length;i++){
            if(lista[i].nome!=""){
                palavras+="´"+lista[i].nome+"^"+lista[i].perfil[0];
            }
        }
        palavrasArray=palavras.split("´");
        $scope.usuariosFiltrados=[];
        for(let i=1;i<palavrasArray.length;i++){
            value=palavrasArray[i].split("^");
            $scope.usuariosFiltrados[i-1]={
                nome:value[0],
                perfil:[
                    value[1]
                ]
            }
        }
      }
});