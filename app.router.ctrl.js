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
	
	$routeProvider.otherwise({redirectTo: "/home"});
});