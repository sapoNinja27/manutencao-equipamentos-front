angular.module("sistemaManutencao").service("marcaService", function ($http, config) {
	this.getMarcas = function () {
		return $http.get(config.baseUrl + "/equipamentos/marcas");
	};
});