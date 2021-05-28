angular.module("sistemaManutencao").config(function ($routeProvider) {
	$routeProvider.when("/home", {
		templateUrl: "pages/home/home.page.html",
		controller: "homePageCtrl",
		StyleSheet:"pages/home/home.page.css",
		resolve: {
			
		}
	});
	$routeProvider.when("/menu", {
		templateUrl: "pages/menu/menu.page.html",
		controller: "menuPageCtrl",
		StyleSheet:"pages/menu/menu.page.css",
		resolve: {
			
		}
	});
	$routeProvider.when("/perfil", {
		templateUrl: "pages/perfil/perfil.page.html",
		controller: "perfilPageCtrl",
		StyleSheet:"pages/perfil/perfil.page.css",
		resolve: {
			
		}
	});
	$routeProvider.when("/adicionarPedido", {
		templateUrl: "pages/novoPedido/novo.pedido.page.html",
		controller: "novoPedidoPageCtrl",
		StyleSheet:"pages/novoPedido/novo.pedido.page.css",
		resolve: {
			
		}
	});
	$routeProvider.when("/adicionarCliente", {
		templateUrl: "pages/novoCliente/novo.cliente.page.html",
		controller: "novoClientePageCtrl",
		StyleSheet:"pages/novCliente/novo.cliente.page.css",
		resolve: {
			
		}
	});
	$routeProvider.when("/listarPedidos", {
		templateUrl: "pages/tabelaPedidos/tabela.pedidos.page.html",
		controller: "tabelaPedidosPageCtrl",
		StyleSheet:"pages/tabelaPedidos/tabela.pedidos.page.css",
		resolve: {
			
		}
	});
	$routeProvider.when("/listarClientes", {
		templateUrl: "pages/tabelaClientes/tabela.clientes.page.html",
		controller: "tabelaClientesPageCtrl",
		StyleSheet:"pages/tabelaClientes/tabela.clientes.page.css",
		resolve: {
			
		}
	});
	
	$routeProvider.otherwise({redirectTo: "/home"});
});