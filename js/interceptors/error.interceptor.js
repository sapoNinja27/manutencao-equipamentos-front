angular.module("sistemaManutencao").factory("errorInterceptor", function ($q) {
	return {
		responseError: function (rejection) {
			if (rejection.status === 400) {
				alert("Não é possivel excluir um cliente com pedidos em aberto")
			}else if(rejection.status==401){
				alert("Credencial incorreta")
			}else if(rejection.status==403){
				alert("Acesso Negado")
			}else if(rejection.status==422){
				alert("Dados invalidos")
			}
			return $q.reject(rejection);
		}
	};
});

