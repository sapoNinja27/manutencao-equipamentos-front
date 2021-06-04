angular.module("sistemaManutencao").config(function ($httpProvider) {
	$httpProvider.interceptors.push("authInterceptor");
});