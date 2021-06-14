angular.module("sistemaManutencao").factory("errorInterceptor", function ($q, $location) {
	return {
		responseError: function (rejection) {
			if (rejection.status === 400) {
				alert("erro de integridade: "+rejection.data.error)
			}else{
				alert("Algo deu errado: "+rejection.data.error)
				console.log(rejection)
			}
			return $q.reject(rejection);
		}
	};
});

