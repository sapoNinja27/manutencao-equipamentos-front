angular.module("sistemaManutencao").service("cargoService", function ($http, config) {
	this.getCargos = function () {
		return $http.get(config.baseUrl + "/cargos/");
	};
});