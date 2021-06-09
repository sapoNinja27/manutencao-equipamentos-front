angular.module("sistemaManutencao").service("equipamentoService", function ($http, config) {
	this.getEquipamentos = function () {
		return $http.get(config.baseUrl + "/equipamentos/tipos");
	};
	this.getMarcas = function () {
		return $http.get(config.baseUrl + "/equipamentos/marcas");
	};
	this.addEquipamento = function (equip) {
		return $http.post(config.baseUrl + "/equipamentos/tipos",equip);
	};
	this.addMarca = function (marca) {
		return $http.post(config.baseUrl + "/equipamentos/marcas",marca);
	};
});