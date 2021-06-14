angular.module("sistemaManutencao").service("usuarioService", function ($http, config) {
	this.getUsuario = function (nome) {
		let usuario = $http.get(config.baseUrl + "/usuarios/nome/"+nome);
		return usuario;
	};
	this.getUsuarios = function () {
		return $http.get(config.baseUrl + "/usuarios/");
	};
	this.attCargo = function (id,cargos) {
		return $http.put(config.baseUrl + "/usuarios/"+id+"/cargos/",cargos);
	};
	this.excluir = function (id) {
		return $http.delete(config.baseUrl + "/usuarios/"+id);
	};
	this.adicionar = function (user) {
		return $http.post(config.baseUrl + "/usuarios/",user);
	};
	this.atualizar = function (id,user) {
		return $http.put(config.baseUrl + "/usuarios/"+id,user);
	};
});