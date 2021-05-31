angular.module("sistemaManutencao").service("ordemService", function ($http, config) {
	this.addOrdem = function (ordem) {
		return $http.post(config.baseUrl + "/ordens", ordem);
	};
});