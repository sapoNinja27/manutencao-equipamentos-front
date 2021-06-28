angular.module("sistemaManutencao").controller("clientePageCtrl", function (formatadorAPI,$scope, $location,cliente,clienteService) {
    let alerta=false;
    $scope.cliente=cliente.data;
    let code=$scope.cliente.nome;
    $scope.excluir=function(id){
        clienteService.delete(id).then(function (data) {
			$location.path("/listarClientes");
		}).catch(function(){
            
        });
    }
    $scope.voltar=function(){
        $location.path("/listarClientes");
    }
    $scope.pedidos=function(){
        $location.path("/listarPedidos").search($scope.cliente.id);
    }
    //envia o cliente baseado em dados novos ou antigos
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
        //aqui diferente do cadastro o alerta so vai ativar se algum campo foi modificado e deixado errado, campos undefined nao vao ativar
        if(alerta){
            alert("Preencha corretamente todos os campos");
         }else{
            clienteService.update(newCliente,$scope.cliente.id).then(function (data) {
                $location.path("/listarClientes");
            }).catch(function(error){
                
            });
         }
    }
    //verificação generica de campo incorreto curto demais
    $scope.campoIncorreto=function(palavra, max){
        if(palavra==undefined){
            return false;
        }
        if(palavra.length<max && palavra.length>0){
            alerta=true;
            return true;
        }else{
            alerta=false;
            return false;
        }
    }
    //função generica que vai atualizar os valores de acordo com o campo que estiver digitado
    $scope.format=function(){
        if($scope.nome!=undefined){
            formatNome();
        }
        if($scope.telefone!=undefined){
            formatTelefone();
        }
        if($scope.cidade!=undefined){
            formatCidade();
        }
        if($scope.bairro!=undefined){
            formatBairro();
        }
    }
    var formatNome=function(){
        $scope.nome=formatadorAPI.formatar( $scope.nome);
    }
    var formatTelefone=function(){
        tel=$scope.telefone.replace(/[^0-9]+/g, "");
        tel="("+tel.substring(0);
        if(tel.length>3){
            tel=tel.substring(0,3)+")"+tel.substring(3);
        }
        if(tel.length>=13){
            if(tel.length>9){
                tel=tel.substring(0,9)+"-"+tel.substring(9);
            } 
            if(tel.length>14){
                tel=tel.substring(0,14)
            }
        }else{
            if(tel.length>8){
                tel=tel.substring(0,8)+"-"+tel.substring(8);
            } 
        }
		$scope.telefone=tel;	
    }
    var formatBairro=function(){
        $scope.bairro=formatadorAPI.formatar( $scope.bairro);
    }
    var formatCidade=function(){
        $scope.cidade=formatadorAPI.formatar( $scope.cidade);
    }
    //faz uma validação simples de email, com um templade de 4 palavras + @ + 4 palvras + . + 2 palavras
    $scope.validarEmail=function(){
        palavra=$scope.email;
        if(palavra!=undefined){
            if(palavra.length==0){
                return false;
            }else{
                if(palavra.includes("@")){
                    dividir=palavra.split("@")
                    if(dividir[0].length>4){
                        if(dividir[1].includes(".")){
                            posArroba=dividir[1].split(".");
                            if(posArroba[0].length>4){
                                if(posArroba[posArroba.length-1].length>1){
                                    return false;
                                }else{
                                    return true;
                                }
                            }else{
                                return true;
                            }
                        }else{
                            return true;
                        }
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            }
        }else{
            return false;
        }
    }
});