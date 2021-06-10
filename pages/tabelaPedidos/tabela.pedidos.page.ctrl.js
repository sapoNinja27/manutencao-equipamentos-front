angular.module("sistemaManutencao").controller("tabelaPedidosPageCtrl", function ($scope, $location,pedidos,storageAPI) {
	$scope.pedidos=pedidos.data;
    
    
    $scope.pedidosAbertos=$scope.pedidos;
    $scope.pedidosFechados;
    let user= storageAPI.getLocalUser().perfil;


    $scope.show=function(estado){

        let show=false;
        if(user=="ADMIN" || user=="RECEPCIONISTA"){
            show=true;
        }else  if(user=="ANALISTA"){
            if(estado=="ANALIZE_PENDENTE"){
                show=true;
            }else if(estado=="RECUSADO"){
                show=true;
            }else if(estado=="CONFIRMACAO_PENDENTE"){
                show=false;
            }else if(estado=="CANCELADO"){
                show=false;
            }else if(estado=="MANUTENCAO_PENDENTE"){
                show=false;
            }else if(estado=="CONCLUIDO"){
                show=false;
            }
        }else  if(user=="TECNICO"){
            if(estado=="ANALIZE_PENDENTE"){
                show=false;
            }else if(estado=="RECUSADO"){
                show=false;
            }else if(estado=="CONFIRMACAO_PENDENTE"){
                show=false;
            }else if(estado=="CANCELADO"){
                show=false;
            }else if(estado=="MANUTENCAO_PENDENTE"){
                show=true;
            }else if(estado=="CONCLUIDO"){
                show=true;
            }
        }
        
        return show;
    }
    $scope.classe=function(estado){
        let item ="item ";
        if(estado=="ANALIZE_PENDENTE"){
            item+= "acao"
        }else if(estado=="RECUSADO"){
            item+= "erro"
        }else if(estado=="CONFIRMACAO_PENDENTE"){
            item+= "ok"
        }else if(estado=="CANCELADO"){
            item+= "erro"
        }else if(estado=="MANUTENCAO_PENDENTE"){
            item+= "acao"
        }else if(estado=="CONCLUIDO"){
            item+= "concluido"
        }
        return item;
    }
    $scope.analizar=function(pedido_id){
        $location.path("/pedido/"+pedido_id);
        $location.replace();
    }

    
	
});