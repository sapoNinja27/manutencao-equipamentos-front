angular.module("sistemaManutencao").factory("errorInterceptor", function ($q) {
	return {
		responseError: function (rejection) {
			if (rejection.status === 400) {
				alert("erro de integridade: "+rejection.data.error)
			}else if(rejection.status==401){
				alert("Credencial incorreta")
			}else if(rejection.status==403){
				alert("Acesso Negado")
			}
			return $q.reject(rejection);
		}
	};
});

