angular.module("sistemaManutencao").config(function ($httpProvider) {
	$httpProvider.interceptors.push("authInterceptor");
	// $httpProvider.interceptors.push("corsInterceptor");
});