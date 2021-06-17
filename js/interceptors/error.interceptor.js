angular.module("sistemaManutencao").factory("errorInterceptor", function ($q, $location) {
	return {
		responseError: function (rejection) {
			if (rejection.status === 400) {
				alert("erro de integridade: "+rejection.data.error)
			}else if(rejection.status==401){
				alert("Credencial incorreta")
			}
			return $q.reject(rejection);
		}
	};
});

