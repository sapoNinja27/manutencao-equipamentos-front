angular.module("sistemaManutencao").service("equipamentoService", function ($http, config) {
	this.getEquipamentos = function () {
		return $http.get(config.baseUrl + "/equipamentos/tipos");
	};
	this.getMarcas = function () {
		return $http.get(config.baseUrl + "/equipamentos/marcas");
	};
});