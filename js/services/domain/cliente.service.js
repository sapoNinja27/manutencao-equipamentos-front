angular.module("sistemaManutencao").service("clienteService", function ($http, config) {
	this.getClientes = function () {
		return $http.get(config.baseUrl + "/clientes");
	};
	this.getCliente = function (id) {
		return $http.get(config.baseUrl + "/clientes/"+id);
	};
	this.addCliente = function (cliente) {
		return $http.post(config.baseUrl + "/clientes", cliente);
	};
	this.update = function (cliente,id) {
		return $http.put(config.baseUrl + "/clientes/"+id, cliente);
	};
	this.delete = function (id) {
		return $http.delete(config.baseUrl + "/clientes/"+id);
	};
});