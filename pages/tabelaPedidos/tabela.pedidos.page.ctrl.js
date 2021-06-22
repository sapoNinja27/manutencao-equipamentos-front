angular.module("sistemaManutencao").controller("tabelaPedidosPageCtrl", function ($scope, $location,pedidos,storageAPI) {
	$scope.pedidos=pedidos.data;
    $scope.pedidosAbertos=$scope.pedidos;
    $scope.pedidosFechados;
    let user= storageAPI.getLocalUser().perfil;
    let clicked;
    let active;
    let hover;
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
    $scope.classe=function(estado, index){
        let mouse=$scope.style(index).split("item ")[1];
        let item;
        let acao = {
            backgroundColor : 'rgb(71, 248, 245)'
        }
        let ok={
            backgroundColor: 'rgb(0, 255, 76)'
        }
        let erro={
            backgroundColor: 'rgb(255, 0, 0)'
        }
        let concluido={
            backgroundColor: 'rgb(142, 160, 147)'
        }
        if(mouse=="hover"){
            acao={
                backgroundColor: 'rgb(59, 201, 199)'
            }
            ok={
                backgroundColor: 'rgb(0, 181, 54)'
            }
            erro={
                backgroundColor: 'rgb(187, 0, 0)'
            }
            concluido={
                backgroundColor: 'rgb(103, 116, 107)'
            }
        }else if(mouse=="active"){
            acao = {
                backgroundColor : 'rgb(46, 157, 155)'
            }
            ok={
                backgroundColor: 'rgb(0, 111, 33)'
            }
            erro={
                backgroundColor: 'rgb(106, 0, 0)'
            }
            concluido={
                backgroundColor: 'rgb(64, 72, 66)'
            }
        }else{
            acao = {
                backgroundColor : 'rgb(71, 248, 245)'
            }
            ok={
                backgroundColor: 'rgb(0, 255, 76)'
            }
            erro={
                backgroundColor: 'rgb(255, 0, 0)'
            }
            concluido={
                backgroundColor: 'rgb(142, 160, 147)'
            }
        }
        if(estado=="ANALIZE_PENDENTE"){
            item=acao;
        }else if(estado=="RECUSADO"){
            item=erro;
        }else if(estado=="CONFIRMACAO_PENDENTE"){
            item=ok;
        }else if(estado=="CANCELADO"){
            item=erro;
        }else if(estado=="MANUTENCAO_PENDENTE"){
            item=acao;
        }else if(estado=="CONCLUIDO"){
            item=concluido;
        }
        return item;
    }
    $scope.analizar=function(pedido_id){
        active=0;
        clicked=false;
        $location.path("/pedido/"+pedido_id);
        $location.replace();
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
});