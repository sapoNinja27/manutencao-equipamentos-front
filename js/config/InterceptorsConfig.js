angular.module("sistemaManutencao").config(function ($httpProvider) {
	$httpProvider.interceptors.push("authInterceptor");
	$httpProvider.interceptors.push("errorInterceptor");
	// $httpProvider.interceptors.push("corsInterceptor");
});