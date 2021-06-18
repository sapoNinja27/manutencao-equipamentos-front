angular.module("sistemaManutencao").config(function ($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider.when("/home", {
		templateUrl: "pages/home/home.page.html",
		controller: "homePageCtrl",
		StyleSheet:"pages/home/home.page.css",
		resolve: {
			localUser: function (storageAPI) {
				return storageAPI.setLocalUser(null);
			},
		}
	});
	$routeProvider.when("/menu", {
		templateUrl: "pages/menu/menu.page.html",
		controller: "menuPageCtrl",
		StyleSheet:"pages/menu/menu.page.css",
		resolve: {
			usuario: function (storageAPI) {
				return (storageAPI.getLocalUser());
			},
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
			clientes: function (clienteService) {
				return clienteService.getClientes();
			},
			marcas: function (equipamentoService) {
				return equipamentoService.getMarcas();
			},
			equipamentos: function (equipamentoService) {
				return equipamentoService.getEquipamentos();
			}
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
			pedidos: function (ordemService) {
				return ordemService.getOrdens();
			}
		}
	});
	$routeProvider.when("/listarClientes", {
		templateUrl: "pages/tabelaClientes/tabela.clientes.page.html",
		controller: "tabelaClientesPageCtrl",
		StyleSheet:"pages/tabelaClientes/tabela.clientes.page.css",
		resolve: {
			clientes: function (clienteService) {
				return clienteService.getClientes();
			}
		}
	});
	$routeProvider.when("/pedido/:id_pedido", {
		templateUrl: "pages/completarPedido/completar.pedido.page.html",
		controller: "completarPedidoPageCtrl",
		StyleSheet:"pages/completarPedido/completar.pedido.page.css",
		resolve: {
			pedido: function ($route,ordemService) {
				return ordemService.getOrdem($route.current.params.id_pedido);
			}
		}
	});
	$routeProvider.when("/cliente/:id_cliente", {
		templateUrl: "pages/cliente/cliente.page.html",
		controller: "clientePageCtrl",
		StyleSheet:"pages/cliente/cliente.page.css",
		resolve: {
			cliente: function ($route,clienteService) {
				return clienteService.getCliente($route.current.params.id_cliente);
			}
		}
	});
	$routeProvider.when("/configUser", {
		templateUrl: "pages/configUser/config.user.page.html",
		controller: "configUserPageCtrl",
		StyleSheet:"pages//configUser/config.user.page.css",
		resolve: {
			usuarios: function (usuarioService) {
				return usuarioService.getUsuarios();
			}
		}
	});
	$routeProvider.otherwise({redirectTo: "/home"});
});