angular.module("sistemaManutencao").controller("clientePageCtrl", function ($scope, $location,cliente,clienteService) {
	
    $scope.cliente=cliente.data;
    

    $scope.excluir=function(id){
        clienteService.delete(id).then(function (data) {
			$location.path("/listarClientes");
            $location.replace();
		});
    }
    $scope.enviar=function(){
        
        let newCliente={
            email: "",
            bairro: "",
            cidade: "",
            nome: "",
            telefone: ""
        }
        if($scope.nome!=""||$scope.nome!=null){
            newCliente.nome=$scope.nome;
        }
        if($scope.nome==""||$scope.nome==null){
            newCliente.nome=$scope.cliente.nome;
        }


        if($scope.email!=""||$scope.email!=null){
            newCliente.email=$scope.email;
        }
        if($scope.email==""||$scope.email==null){
            newCliente.email=$scope.cliente.email;
        }


        if($scope.bairro!=""||$scope.bairro!=null){
            newCliente.bairro=$scope.bairro;
        }
        if($scope.bairro==""||$scope.bairro==null){
            newCliente.bairro=$scope.cliente.endereco.bairro;
        }


        if($scope.cidade!=""||$scope.cidade!=null){
            newCliente.cidade=$scope.cidade;
        }
        if($scope.cidade==""||$scope.cidade==null){
            newCliente.cidade=$scope.cliente.endereco.cidade;
        }


        if($scope.telefone!=""||$scope.telefone!=null){
            newCliente.telefone=$scope.telefone;
        }
        if($scope.telefone==""||$scope.telefone==null){
            newCliente.telefone=$scope.cliente.telefone;
        }
        clienteService.update(newCliente,$scope.cliente.id).then(function (data) {
			$location.path("/menu");
		}).catch(function(){
            
        });
    }
	
});