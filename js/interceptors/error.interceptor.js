angular.module("sistemaManutencao").factory("errorInterceptor", function ($q, $location) {
	return {
		responseError: function (rejection) {
			if (rejection.status === 400) {
				console.log("erro de integridade")
			}
			return $q.reject(rejection);
		}
	};
});

