angular.module("sistemaManutencao").service("ordemService", function ($http, config) {
	this.addOrdem = function (ordem) {
		return $http.post(config.baseUrl + "/ordens", ordem);
	};
	this.getOrdens = function () {
		return $http.get(config.baseUrl + "/ordens");
	};
	
	this.getOrdem = function (id) {
		return $http.get(config.baseUrl + "/ordens/"+id);
	};
	this.recusar = function (id) {
		return $http.put(config.baseUrl + "/ordens/"+id+"/recusar");
	};
});