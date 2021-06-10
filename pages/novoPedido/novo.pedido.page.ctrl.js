angular.module("sistemaManutencao").controller("novoPedidoPageCtrl", function ($scope, $location,ordemService,equipamentoService, clientes,equipamentos,marcas,storageAPI) {
	
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
                ordemService.addOrdem(ordem).then(function (data) {
                    $location.path("/menu");
                });
            });
        }
        if($scope.marca!="Novo" && $scope.equipamento=="Novo"){
            let novoEquipamento={
                nome:$scope.equipamentoNew,
                marca: $scope.marca
            }
            equipamentoService.addEquipamento(novoEquipamento).then(function (data) {
                ordem.equipamento=novoEquipamento.nome;
                ordemService.addOrdem(ordem).then(function (data) {
                    $location.path("/menu");
                });
            });
        }
        if($scope.marca!="Novo" && $scope.equipamento!="Novo"){
            ordemService.addOrdem(ordem).then(function (data) {
                $location.path("/menu");
            });
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
    



// campos cliente
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
        }
    }
    $scope.toggle=function() { 
        $scope.show=!$scope.show;
    }
    $scope.filtrar=function (palavra) {
        if(palavra.length==0){
            $scope.show=false;
        }else{
            $scope.show=true;
        }
        novaLista=[]
        for(let i=0;i<$scope.clientes.length;i++){
            novaLista[i]={nome: ""}
            for(let j=0;j<palavra.length;j++){
                if($scope.clientes[i].nome.charAt(j)==palavra.charAt(j)){
                    novaLista[i].nome=$scope.clientes[i].nome;
                    atualizar(novaLista);
                }else{
                    novaLista[i]={nome: ""}
                    atualizar(novaLista);
                }
            }
        }
      }
      var atualizar=function(lista){
        let palavras="";
        for(let i=0;i<lista.length;i++){
            if(lista[i].nome!=""){
                palavras+=":"+lista[i].nome;
            }
        }
        palavrasArray=palavras.split(":");
        $scope.clientesFiltrados=[];
        for(let i=1;i<palavrasArray.length;i++){
            $scope.clientesFiltrados[i-1]={nome:palavrasArray[i]}
        }
      }
	
});