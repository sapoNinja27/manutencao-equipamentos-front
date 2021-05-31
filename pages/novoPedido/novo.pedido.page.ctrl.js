angular.module("sistemaManutencao").controller("novoPedidoPageCtrl", function ($scope, $location,ordemService, clientes,equipamentos,marcas) {
	
    $scope.clientes=clientes.data;
    $scope.equipamentos=equipamentos.data;
    $scope.marcas=marcas.data;
    $scope.newEquipamento=[];


    $scope.clientesFiltrados=$scope.clientes;
    $scope.nome=""
    $scope.marca="";
    $scope.equipamento="";
    $scope.problemas="";
    $scope.adicionar=function(){
        console.log("nome: "+ $scope.nome)
        console.log("marca: "+ $scope.marca)
        console.log("equipamento: "+ $scope.equipamento)
        console.log("problemas: "+ $scope.problemas)
        let equip=null;
        let cli=null;
        for(let i=0;i<$scope.clientes.length;i++){
            if($scope.clientes[i].nome==$scope.nome){
                cli=$scope.clientes[i].id;
            }
        }
        ordem={
            equipamento: 1,
            problema:$scope.problemas,
            cliente:cli

        }
        console.log(ordem)
		ordemService.addOrdem(ordem).then(function (data) {
			//$location.path("/contatos");
		});
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