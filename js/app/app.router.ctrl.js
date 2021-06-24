angular.module("sistemaManutencao").config(function ($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
	$routeProvider.when("/home", {
		templateUrl: "pages/home/home.page.html",
		controller: "homePageCtrl",
		StyleSheet:"pages/home/home.page.css",
		resolve: {
			localUser: function (storageAPI) {
				storageAPI.setLocalUser(null);
			}
		}
	});
	$routeProvider.when("/menu", {
		templateUrl: "pages/menuPage/menu.page.html",
		controller: "menuPageCtrl",
		StyleSheet:"pages/menuPage/menu.page.css",
		resolve: {
			usuario: function (storageAPI) {
				return (storageAPI.getLocalUser());
			},
			permission: function(storageAPI,$location,$route){
				$location.search("")
				let localUser=storageAPI.getLocalUser();
				if(localUser == undefined || localUser == null){
					$location.path("/home");
					$location.replace();
					$route.reload();
				}
				return false;
			}
		}
	});
	$routeProvider.when("/perfil", {
		templateUrl: "pages/perfil/perfil.page.html",
		controller: "perfilPageCtrl",
		StyleSheet:"pages/perfil/perfil.page.css",
		resolve: {
			permission: function(storageAPI,$location,$route){
				let localUser=storageAPI.getLocalUser();
				if(localUser == undefined || localUser == null){
					$location.path("/home");
					$location.replace();
					$route.reload();
				}
				return false;
			}
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
			},
			permission: function(storageAPI,$location,$route){
				let localUser=storageAPI.getLocalUser();
				let permitido=false;
				if(localUser.perfil=="ADMIN"){
					permitido=true;
				}else{
					localUser.perfil.forEach(perfil => {
						if(perfil=="RECEPCIONISTA"){
							permitido=true;
						}
					});
				}
				if(!permitido){
					$location.path("/menu");
					$location.replace();
					$route.reload();
				}
				return false;
			}
		}
	});
	$routeProvider.when("/adicionarCliente", {
		templateUrl: "pages/novoCliente/novo.cliente.page.html",
		controller: "novoClientePageCtrl",
		StyleSheet:"pages/novCliente/novo.cliente.page.css",
		resolve: {
			permission: function(storageAPI,$location,$route){
				let localUser=storageAPI.getLocalUser();
				let permitido=false;
				if(localUser.perfil=="ADMIN"){
					permitido=true;
				}else{
					localUser.perfil.forEach(perfil => {
						if(perfil=="RECEPCIONISTA"){
							permitido=true;
						}
					});
				}
				if(!permitido){
					$location.path("/menu");
					$location.replace();
					$route.reload();
				}
				return false;
			}
		}
	});
	$routeProvider.when("/listarPedidos", {
		templateUrl: "pages/tabelaPedidos/tabela.pedidos.page.html",
		controller: "tabelaPedidosPageCtrl",
		StyleSheet:"pages/tabelaPedidos/tabela.pedidos.page.css",
		resolve: {
			pedidos: function ($location,ordemService) {
				let param =JSON.stringify($location.search())
				if(param!="{}"){
					param=param.split('"')[1]
					return ordemService.getOrdensByCliente(param)
				}else{
					return ordemService.getOrdens();
				}
			},
			permission: function(storageAPI,$location,$route){
				let localUser=storageAPI.getLocalUser();
				if(localUser == undefined || localUser == null){
					$location.path("/home");
					$location.replace();
					$route.reload();
				}
				return false;
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
			},
			permission: function(storageAPI,$location,$route){
				let localUser=storageAPI.getLocalUser();
				let permitido=false;
				if(localUser.perfil=="ADMIN"){
					permitido=true;
				}else{
					localUser.perfil.forEach(perfil => {
						if(perfil=="RECEPCIONISTA"){
							permitido=true;
						}
					});
				}
				if(!permitido){
					$location.path("/menu");
					$location.replace();
					$route.reload();
				}
				return false;
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
			},
			permission: function(storageAPI,$location,$route){
				let localUser=storageAPI.getLocalUser();
				if(localUser == undefined || localUser == null){
					$location.path("/home");
					$location.replace();
					$route.reload();
				}
				return false;
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
			},
			permission: function(storageAPI,$location,$route){
				let localUser=storageAPI.getLocalUser();
				let permitido=false;
				if(localUser.perfil=="ADMIN"){
					permitido=true;
				}else{
					localUser.perfil.forEach(perfil => {
						if(perfil=="RECEPCIONISTA"){
							permitido=true;
						}
					});
				}
				if(!permitido){
					$location.path("/menu");
					$location.replace();
					$route.reload();
				}
				return false;
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
			},
			permission: function(storageAPI,$location,$route){
				let localUser=storageAPI.getLocalUser();
				if(localUser.perfil!="ADMIN"){
					$location.path("/menu");
					$location.replace();
					$route.reload();
				}
				return false;
			}
		}
	});
	$routeProvider.otherwise({redirectTo: "/home"});
});