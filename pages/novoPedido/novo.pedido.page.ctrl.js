angular.module("sistemaManutencao").controller("novoPedidoPageCtrl", function ($scope,pesquisaAPI,formatadorAPI, $location,ordemService,equipamentoService, clientes,equipamentos,marcas) {
    $scope.clientes=clientes.data;
    $scope.equipamentos=equipamentos.data;
    $scope.marcas=marcas.data;
    $scope.newEquipamento=[];
    $scope.pdeFechar=true;
    $scope.clientesFiltrados=$scope.clientes;
    $scope.nome=""
    $scope.marca="";
    $scope.equipamento="";
    $scope.problemas="";
    $scope.invalido=false;
    $scope.adicionar=function(){
        let cli=null;
        for(let i=0;i<$scope.clientes.length;i++){
            if($scope.clientes[i].nome==$scope.nome){
                cli=$scope.clientes[i].id;
            }
        }
        ordem={
            equipamento: $scope.equipamento,
            marca:$scope.marca,
            problema:$scope.problemas,
            cliente:cli
        }
        if($scope.marca=="Novo"){
            let novaMarca={
                nome:$scope.marcaNew,
                equipamento: $scope.equipamentoNew
            }
            equipamentoService.addMarca(novaMarca).then(function (data) {
                ordem.marca=novaMarca.nome;
                ordem.equipamento=novaMarca.equipamento;
                sendOrdem(ordem);
            });
        }
        if($scope.marca!="Novo" && $scope.equipamento=="Novo"){
            let novoEquipamento={
                nome:$scope.equipamentoNew,
                marca: $scope.marca
            }
            equipamentoService.addEquipamento(novoEquipamento).then(function (data) {
                ordem.equipamento=novoEquipamento.nome;
                sendOrdem(ordem);
            });
        }
        if($scope.marca!="Novo" && $scope.equipamento!="Novo"){
            sendOrdem(ordem);
        }
    }
    var sendOrdem=function(ordem){
        if(ordem.cliente!=null){
            if(ordem.marca!="" || ordem.equipamento!=""){
                if($scope.problemas.length>=10){
                    ordemService.addOrdem(ordem).then(function (data) {
                        alert("Adicionado!!");
                        $location.path("/menu");
                    }).catch(function(){
                    
                    });
                }else{
                    alert("Descrição de problemas muito curta")
                }
            }else{
                alert("Selecione corretamente equipamento e marca")
            }
        }else{
            alert("Cliente Invalido")
        }
    }
    $scope.atualizarEquipamentos=function(marca){
        let equipamento=""
        $scope.newEquipamento=[];
        for(let i=0;i<$scope.equipamentos.length;i++){
            if($scope.equipamentos[i].marca==marca){
                equipamento+=":"+$scope.equipamentos[i].nome;
            }
        }
        let equips=equipamento.split(":");
        for(let i=1;i<equips.length;i++){
            $scope.newEquipamento[i-1]={nome:equips[i]}
        }
    }
    //checar se vai adicionar nova marca ou equipamento
    $scope.novo=function(item){
        if(item=="marca"){
            if($scope.marca=="Novo"){
                return true;
            }
        }
        if(item=="equipamento"){
            if($scope.equipamento=="Novo"){
                return true;
            }
        }
        return false;
    }
    $scope.checarTamanho=function(){
        if($scope.problemas.length<10 && $scope.problemas.length>0){
            $scope.badDescription=true;
        }else{
            $scope.badDescription=false;
        }
    }
    //campos cliente
    $scope.selecionar=function(nome) {
        $scope.nome=nome;
        $scope.show=false;
        $scope.pdeFechar=true;
    }
    $scope.mouseEmcima=function(expression){
        $scope.pdeFechar=expression;
    }
    $scope.clicouFora=function(){
        if($scope.pdeFechar){
            $scope.show=false;
            $scope.clientesFiltrados=$scope.clientes;
        }
    }
    $scope.toggle=function() { 
        $scope.show=!$scope.show;
    }
    $scope.filtrar=function (palavra) {
        $scope.nome=formatadorAPI.formatar(palavra)
        palavra=formatadorAPI.formatar(palavra);
        if(palavra.length==0){
            $scope.show=false;
            $scope.invalido=false;
        }else{
            $scope.show=true;
            if($scope.clientesFiltrados.length==0){
                $scope.invalido=true;
            }else{
                $scope.invalido=false;
            }
        }
        $scope.clientesFiltrados=pesquisaAPI.filtrar(palavra,$scope.clientes);
      }
      $scope.voltar=function(){
        $location.path("/menu");
        $location.replace();
    }
});