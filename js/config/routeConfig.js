angular.module("sistemaManutencao").config(function ($routeProvider) {
	$routeProvider.when("/home", {
		templateUrl: "home/home.page.html",
		controller: "homePageCtrl",
		StyleSheet:"home/home.page.css",
		resolve: {
			// contatos: function (contatosAPI) {
			// 	return contatosAPI.getContatos();
			// },
			// operadoras: function (operadorasAPI) {
			// 	return operadorasAPI.getOperadoras();
			// }
		}
	});
	$routeProvider.when("/menu", {
		templateUrl: "menu/menu.page.html",
		controller: "menuPageCtrl",
		StyleSheet:"menu/menu.page.css",
		resolve: {
			// contatos: function (contatosAPI) {
			// 	return contatosAPI.getContatos();
			// },
			// operadoras: function (operadorasAPI) {
			// 	return operadorasAPI.getOperadoras();
			// }
		}
	});
	// $routeProvider.when("/novoContato", {
	// 	templateUrl: "view/novoContato.html",
	// 	controller: "novoContatoCtrl",
	// 	resolve: {
	// 		operadoras: function (operadorasAPI) {
	// 			return operadorasAPI.getOperadoras();
	// 		}
	// 	}
	// });
	// $routeProvider.when("/detalhesContato/:id", {
	// 	templateUrl: "view/detalhesContato.html",
	// 	controller: "detalhesContatoCtrl",
	// 	resolve: {
	// 		contato: function (contatosAPI, $route) {
	// 			return contatosAPI.getContato($route.current.params.id);
	// 		}
	// 	}
	// });
	$routeProvider.otherwise({redirectTo: "/home"});
});