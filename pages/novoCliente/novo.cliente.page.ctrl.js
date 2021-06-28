angular.module("sistemaManutencao").controller("novoClientePageCtrl", function ($scope,formatadorAPI, $location,clienteService) {
    //comentarios das funçoes iguais aos da pagina cliente
    $scope.nome;
    $scope.rg;
    $scope.cpf;
    $scope.bairro;
    $scope.cidade;
    $scope.telefone;
    $scope.email;
    let alerta=false;
    $scope.format=function(){
        if($scope.nome!=undefined){
            formatNome();
        }
        if($scope.rg!=undefined){
            formatRg();
        }
        if($scope.cpf!=undefined){
            formatCpf();
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
        $scope.nome=formatadorAPI.formatar($scope.nome);
    }
    var formatRg=function(){
        rg=$scope.rg.replace(/[^0-9]+/g, "");
        if(rg.length>2){
            rg=rg.substring(0,2)+"."+rg.substring(2);
        }
        if(rg.length>6){
            rg=rg.substring(0,6)+"."+rg.substring(6);
        }
        if(rg.length>10){
            rg=rg.substring(0,10)+"-"+rg.substring(10);
        }
        if(rg.length>12){
            rg=rg.substring(0,12);
        }
		$scope.rg=rg;	
    }
    var formatCpf=function(){
        cpf=$scope.cpf.replace(/[^0-9]+/g, "");
        if(cpf.length>3){
            cpf=cpf.substring(0,3)+"."+cpf.substring(3);
        }
        if(cpf.length>7){
            cpf=cpf.substring(0,7)+"."+cpf.substring(7);
        }
        if(cpf.length>11){
            cpf=cpf.substring(0,11)+"-"+cpf.substring(11);
        }
        if(cpf.length>14){
            cpf=cpf.substring(0,14);
        }
		$scope.cpf=cpf;	
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
	$scope.adicionar=function(){
         if(alerta){
            alert("Preencha corretamente todos os campos");
         }else{
            let cpf=$scope.cpf.replace(/[^0-9]+/g, "");
            let rg=$scope.rg.replace(/[^0-9]+/g, "");
            let newCliente={
                "nome": $scope.nome,
                "telefone": $scope.telefone,
                "rg":rg,
                "email": $scope.email,
                "cpf": cpf,
                "bairro": $scope.bairro,
                "cidade": $scope.cidade
            }
            clienteService.addCliente(newCliente).then(function (data) {
                alert("Adicionado!!");
                $location.path("/menu");
            }).catch(function(){
                
            });
         }
         
    }
    $scope.campoIncorreto=function(palavra, max){
        if(palavra==undefined){
            alerta=true;
            return false;
        }
        if(palavra.length<max && palavra.length>0){
            alerta=true;
            return true;
        }else{
            if(!$scope.validarEmail() && $scope.email!=undefined){
                if($scope.email.length!=0){
                    alerta=false;
                }else{
                    alerta=true;
                }
            }else{
                alerta=true;
            }
            return false;
        }
    }
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
    $scope.voltar=function(){
        $location.path("/menu");
        $location.replace();
    }
});