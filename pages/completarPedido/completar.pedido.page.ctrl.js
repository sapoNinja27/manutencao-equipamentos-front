angular.module("sistemaManutencao").controller("completarPedidoPageCtrl", function ($scope, $location,pedido,ordemService,storageAPI,imageService) {
	
    $scope.pedido=pedido.data;
    
    $scope.analize="";
    let user=storageAPI.getLocalUser().perfil;


    


    $scope.enviar=function(){
        let ordemAtualizada={
            "problemasExtras":$scope.analize,
            "valor":$scope.valor
        }
        //aqui ta calculando quantos arquivos vai vir no file
        let cont=-1;
        let f=[];
        do{
            cont++;
            f[cont]=document.getElementById('img').files[cont];
        }while(f[cont]!=null)
        //aqui ele vai fazer as requisiçoes, na ultima ele termina a analize tambem
        for(let i=0;i<cont;i++){
            let f=document.getElementById('img').files[i];
            ordemService.addFotos($scope.pedido.id,f)
            .then(function(data){
                if(i==cont-1){
                    ordemService.analizar($scope.pedido.id,ordemAtualizada).then(function(data){
                        $location.path("/listarPedidos");
                        $location.replace();
                    })
                }
            })
            .catch(function(error){
                
            })
        }
    }
    $scope.finalizar=function(){
        ordemService.finalizar($scope.pedido.id).then(function(data){
			$location.path("/listarPedidos");
            $location.replace();
        }).catch(function(){
            
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
    $scope.secretaria=function(){
        let show=false;
        if(user=="ADMIN" || user=="RECEPCIONISTA"){
            show=true;
        }else  if(user=="ANALISTA"||user=="TECNICO"){
            show=false;
        }
        if($scope.pedido.state=="CANCELADO"){
            show=false;
        }
        return show;
    }
    $scope.recusar=function(id){
        ordemService.recusar(id).then(function (data) {
			$location.path("/listarPedidos");
            $location.replace();
		}).catch(function(){
            
        });
    }
    $scope.cancelar=function(id){
        ordemService.cancelar(id).then(function (data) {
			$location.path("/listarPedidos");
            $location.replace();
		}).catch(function(){
            
        });
    }
	
});