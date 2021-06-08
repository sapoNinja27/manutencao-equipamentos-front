angular.module("sistemaManutencao").controller("completarPedidoPageCtrl", function ($scope, $location,pedido,ordemService,storageAPI) {
	
    $scope.pedido=pedido.data;
    
    $scope.analize="";
    $scope.imagens="";
    let user=storageAPI.getLocalUser().perfil;

    
    $scope.enviar=function(){
        let ordemAtualizada={
            "problemasExtras":$scope.analize,
            "fotos":["1","2"]
        }
        ordemService.analizar($scope.pedido.id,ordemAtualizada).then(function(data){
            console.log("ok")
        })
        //upar imagem no s3, upar o probleas com o link das imagens ao ordem,
    }
    $scope.finalizar=function(){
        ordemService.finalizar($scope.pedido.id).then(function(data){
            console.log("ok")
        })
    }
    $scope.analista=function(){
        let show=false;
        if(user=="ADMIN" || user=="ANALISTA"){
            show=true;
        }else  if(user=="RECEPCIONISTA"||user=="TECNICO"){
            show=false;
        }
        if($scope.pedido.state!="ANALIZE_PENDENTE"){
            show=false;
        }
        return show;
    }
    $scope.recusar=function(id){
        console.log($scope.pedido)
        ordemService.recusar(id).then(function (data) {
			$location.path("/listarPedidos");
		}).catch(function(){
            
        });
    }
	
});