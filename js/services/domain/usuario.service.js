angular.module("sistemaManutencao").service("usuarioService", function ($http, config) {
	this.getUsuario = function (nome) {
		let usuario = $http.get(config.baseUrl + "/usuarios/nome/"+nome);
		return usuario;
	};
});