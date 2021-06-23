angular.module("sistemaManutencao").factory("errorInterceptor", function ($q,$location) {
	return {
		responseError: function (rejection,$route) {

			if (rejection.status === 400) {
				alert("Não é possivel excluir um cliente com pedidos em aberto")
			}else if(rejection.status==401){
				alert("Credencial incorreta")
			}else if(rejection.status==403){
				$location.path("/menu");
				$location.replace();
				alert("Acesso Negado")
			}else if(rejection.status==422){
				alert(rejection.data.errors[0].message)
			}else if(rejection.status==404){
				let pagina=rejection.data.path;
				pagina=pagina.split("/")[1]
				if(pagina=="clientes"){
					$location.path("/listarClientes");
				}
				if(pagina=="ordens"){
					$location.path("/listarPedidos");
				}
				$location.replace();
				alert("Não encontrado")
			}
			return $q.reject(rejection);
		}
	};
});

